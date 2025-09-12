const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { google } = require("googleapis");
const { Pool } = require("pg");
const fs = require("fs");
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

// 🔹 Step 1: Redirect user to Google login
app.get("/auth/google", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/youtube.upload"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
  res.redirect(url);
});

// 🔹 Step 2: Handle Google callback
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tokens:", tokens);
    await pool.query(
      `INSERT INTO tokens (platform, access_token, refresh_token, expires_at)
   VALUES ($1, $2, $3, NOW() + interval '55 minutes')
   ON CONFLICT (platform) DO UPDATE
   SET access_token = EXCLUDED.access_token,
       refresh_token = EXCLUDED.refresh_token,
       expires_at = EXCLUDED.expires_at;`,
      ["youtube", tokens.access_token, tokens.refresh_token]
    );

    res.send("YouTube account linked successfully!");
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).send("Failed to authenticate with Google");
  }
});

// 🔹 Step 3: Upload video to YouTube
app.post("/post/youtube", upload.single("file"), async (req, res) => {
  const { title, description } = req.body;
  const filePath = req.file?.path;
  if (!filePath) return res.status(400).json({ error: "No file uploaded" });

  try {
    // Get stored tokens
    const result = await pool.query(
      "SELECT access_token, refresh_token FROM tokens WHERE platform=$1 LIMIT 1",
      ["youtube"]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "YouTube not linked yet" });
    }

    const { access_token, refresh_token } = result.rows[0];

    oauth2Client.setCredentials({ access_token, refresh_token });

    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: { title, description, categoryId: "22" },
        status: { privacyStatus: "public" },
      },
      media: { body: fs.createReadStream(filePath) },
    });

    await pool.query(
      "INSERT INTO posts (platform, content, status) VALUES ($1, $2, $3)",
      ["youtube", title, "published"]
    );

    res.json({ message: "Uploaded successfully", data: response.data });
  } catch (err) {
    console.error("YouTube Upload Error:", err.message);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running at http://localhost:${process.env.PORT}`);
});
