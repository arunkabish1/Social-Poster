const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { google } = require("googleapis");
const { Pool } = require("pg");
const fs = require("fs");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// DB connection
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

// Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// ✅ Helper: refresh token if expired
async function getValidTokens() {
  const result = await pool.query(
    "SELECT access_token, refresh_token, expires_at FROM tokens WHERE platform=$1 LIMIT 1",
    ["youtube"]
  );

  if (result.rows.length === 0) throw new Error("YouTube not linked yet");

  let { access_token, refresh_token, expires_at } = result.rows[0];

  // If expired, refresh it
  if (new Date() >= new Date(expires_at)) {
    console.log("⏳ Refreshing expired token...");
    oauth2Client.setCredentials({ refresh_token });

    const { credentials } = await oauth2Client.refreshAccessToken();
    access_token = credentials.access_token;

    await pool.query(
      `UPDATE tokens
       SET access_token=$1, expires_at=NOW() + interval '55 minutes'
       WHERE platform=$2`,
      [access_token, "youtube"]
    );

    console.log("✅ Token refreshed and saved");
  }

  return { access_token, refresh_token };
}

// 🔹 Step 1: Redirect user to Google login
app.get("/auth/google", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/youtube.upload"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // ensures refresh token is provided
    scope: scopes,
    prompt: "consent", // force consent to always get refresh_token
  });
  res.redirect(url);
});

// 🔹 Step 2: Handle Google callback
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oauth2Client.getToken(code);
    await pool.query(
      `INSERT INTO tokens (platform, access_token, refresh_token, expires_at)
       VALUES ($1, $2, $3, NOW() + interval '55 minutes')
       ON CONFLICT (platform) DO UPDATE
       SET access_token = EXCLUDED.access_token,
           refresh_token = EXCLUDED.refresh_token,
           expires_at = EXCLUDED.expires_at;`,
      ["youtube", tokens.access_token, tokens.refresh_token]
    );

    console.log("✅ YouTube account linked!");
    res.redirect("http://localhost:5173/createform");
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).send("Failed to authenticate with Google");
  }
});

// 🔹 Step 3: Schedule a post
app.post("/schedule/youtube", upload.single("file"), async (req, res) => {
  const { title, description, scheduled_time } = req.body;
  const filePath = req.file?.path;

  if (!filePath) return res.status(400).json({ error: "No file uploaded" });

  try {
    await pool.query(
      `INSERT INTO scheduled_posts (platform, title, description, file_path, scheduled_time)
       VALUES ($1, $2, $3, $4, $5)`,
      ["youtube", title, description, filePath, scheduled_time]
    );

    res.json({ message: "✅ Post scheduled successfully!" });
  } catch (err) {
    console.error("Schedule error:", err);
    res.status(500).json({ error: "Failed to schedule post" });
  }
});

// 🔹 Step 4: Cron job to publish scheduled posts
cron.schedule("* * * * *", async () => {
  console.log("⏳ Checking scheduled posts...");

  const now = new Date();
  const result = await pool.query(
    `SELECT * FROM scheduled_posts 
     WHERE scheduled_time <= $1 AND status = 'pending'`,
    [now]
  );

  for (const post of result.rows) {
    try {
      const { access_token, refresh_token } = await getValidTokens();
      oauth2Client.setCredentials({ access_token, refresh_token });

      const youtube = google.youtube({ version: "v3", auth: oauth2Client });

      await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: {
            title: post.title,
            description: post.description,
            categoryId: "22",
          },
          status: { privacyStatus: "public" },
        },
        media: { body: fs.createReadStream(post.file_path) },
      });

      await pool.query(
        "UPDATE scheduled_posts SET status='published' WHERE id=$1",
        [post.id]
      );

      console.log(`✅ Published post ${post.id}`);
    } catch (err) {
      await pool.query(
        "UPDATE scheduled_posts SET status='failed' WHERE id=$1",
        [post.id]
      );
      console.error(`❌ Failed to publish post ${post.id}`, err.message);
    }
  }
});

// 🔹 Step 5: Background proactive token refresh (every 50 min)
cron.schedule("*/50 * * * *", async () => {
  try {
    console.log("🔄 Proactive YouTube token check...");
    const { access_token, refresh_token } = await getValidTokens();
    oauth2Client.setCredentials({ access_token, refresh_token });
    console.log("✅ YouTube token is valid");
  } catch (err) {
    console.error("❌ Token refresh failed:", err.message);
  }
});

// 🔹 Step 6: Get scheduled posts
app.get("/posts/scheduled", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM scheduled_posts ORDER BY scheduled_time ASC"
  );
  res.json(result.rows);
});

// for frontend testing
// 🔹 Check if YouTube is connected
app.get("/status/youtube", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT 1 FROM tokens WHERE platform=$1 LIMIT 1",
      ["youtube"]
    );

    res.json({ connected: result.rows.length > 0 });
  } catch (err) {
    console.error("Status check error:", err.message);
    res.status(500).json({ connected: false });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${process.env.PORT}`);
});
