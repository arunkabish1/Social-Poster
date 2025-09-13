import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}, we received your message!`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      {/* Navbar */}
      <nav className="p-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-fuchsia-950 tracking-tight">
          Social Ease
        </h1>
        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
          <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
          <li><Link to="/features" className="hover:text-gray-900 transition">Features</Link></li>
          <li><Link to="/pricing" className="hover:text-gray-900 transition">Pricing</Link></li>
          <li><Link to="/contact" className="hover:text-gray-900 transition">Contact</Link></li>
        </ul>
      </nav>

      {/* Contact Form */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl max-w-lg w-full p-8 border">
          <h1 className="text-3xl font-bold text-fuchsia-900 text-center mb-6">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Have questions? Send us a message and we’ll get back to you soon!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-fuchsia-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-fuchsia-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-fuchsia-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 px-4 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>📍 Coimbatore, India</p>
            <p>📧 arunkabish@gmail.com</p>
            <p>📞 +91 83005 03514</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 border-t text-center text-gray-600 text-sm bg-white/80 backdrop-blur-md">
        © {new Date().getFullYear()} Social Ease. All rights reserved.
      </footer>
    </div>
  );
}
