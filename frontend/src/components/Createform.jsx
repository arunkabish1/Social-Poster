import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function CreateForm() {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = () => {
    if (!post || !scheduledTime) {
      alert("Please upload a file and select a schedule time!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", post);
    formData.append("scheduled_time", scheduledTime);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://social-backend-fgha.onrender.com/schedule/youtube", true);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert("✅ " + JSON.parse(xhr.response).message);
        setProgress(0);
        setPost(null);
        setTitle("");
        setDescription("");
        setScheduledTime("");
      } else if (xhr.status === 401) {
        const { loginUrl } = JSON.parse(xhr.response);
        window.location.href = loginUrl;
      } else {
        alert("❌ Upload failed");
        setProgress(0);
      }
    };

    xhr.onerror = () => {
      alert("❌ Network error during upload");
      setProgress(0);
    };

    xhr.send(formData);
  };

  return (
    <div className="relative min-h-screen px-4 py-6 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Navbar */}
      <nav className="p-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-fuchsia-950 tracking-tight">
          Social Ease 
        </h1>
        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
          <li className="cursor-pointer hover:text-gray-900 transition">Home</li>
          <li className="cursor-pointer hover:text-gray-900 transition">Features</li>
          <li className="cursor-pointer hover:text-gray-900 transition">Pricing</li>
          <li className="cursor-pointer hover:text-gray-900 transition">Contact</li>
        </ul>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-b animate-fade-in-down transition duration-300 ease-out rounded-b-lg">
          <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-gray-900 transition">Home</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Features</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Pricing</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Contact</li>
          </ul>
        </div>
      )}

      {/* Form Card */}
      <div className="w-full max-w-2xl mx-auto mt-10 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-fuchsia-900 text-center">
          Schedule YouTube Post
        </h1>

        <div className="space-y-5">
          <label className="block text-left">
            <span className="text-gray-700 font-medium">Title</span>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-3 block w-full focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
              value={title}
              disabled={progress > 0 && progress < 100}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </label>

          <label className="block text-left">
            <span className="text-gray-700 font-medium">Description</span>
            <textarea
              className="mt-1 border border-gray-300 rounded-lg p-3 block w-full focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
              rows={4}
              value={description}
              disabled={progress > 0 && progress < 100}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
            />
          </label>

          <label className="block text-left">
            <span className="text-gray-700 font-medium">Upload File</span>
            <input
              type="file"
              className="mt-1 border border-gray-300 rounded-lg p-3 block w-full bg-gray-50 cursor-pointer focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
              disabled={progress > 0 && progress < 100}
              onChange={(e) => setPost(e.target.files ? e.target.files[0] : null)}
            />
            {post && <p className="mt-1 text-sm text-gray-500">📂 {post.name}</p>}
          </label>

          <label className="block text-left">
            <span className="text-gray-700 font-medium">Schedule Time</span>
            <input
              type="datetime-local"
              className="mt-1 border border-gray-300 rounded-lg p-3 block w-full focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
              value={scheduledTime}
              disabled={progress > 0 && progress < 100}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </label>

          {/* Progress Bar */}
          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-4 text-xs text-center text-white transition-all duration-300 ${
                  progress === 100 ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}

          <button
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition"
            onClick={handleSubmit}
            disabled={progress > 0 && progress < 100}
          >
            {progress > 0 && progress < 100 ? "Uploading..." : "Schedule Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
