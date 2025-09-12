import React, { useState } from "react";

export default function CreateForm() {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!post) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", post); // ✅ use post, not file

    try {
      const res = await fetch("http://localhost:5000/post/youtube", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert("Upload success: " + JSON.stringify(data));
    } catch (err) {
      console.log(err);
      alert("Error uploading file");
    }
  };

  return (
    <div className="container min-h-screen">
      <h1 className="text-3xl font-bold">Create Post</h1>
      <div className="form mt-4">
        <label className="font-semibold text-lg p-4 block">
          Title
          <input
            type="text"
            className="border border-gray-200 rounded-xl ring p-2 block w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="font-semibold text-lg p-4 block">
          Description
          <textarea
            name="des"
            className="border border-gray-400 rounded-lg p-2 block w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="font-semibold text-lg p-4 block">
          Upload file
          <input
            type="file"
            className="border border-gray-200 rounded-xl ring p-2 block w-full"
            onChange={(e) => setPost(e.target.files ? e.target.files[0] : null)}
          />
        </label>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
  