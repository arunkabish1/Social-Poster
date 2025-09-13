import React, { useState } from "react";
import { FaBars, FaTimes, FaCalendarAlt, FaCloudUploadAlt, FaYoutube, FaCheckCircle } from "react-icons/fa";

export default function FeaturesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen px-4 py-12 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Navbar */}
      <nav className="p-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-fuchsia-950 tracking-tight">
          Social Ease
        </h1>
        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
          <li className="cursor-pointer hover:text-gray-900 transition">Home</li>
          <li className="cursor-pointer text-fuchsia-700 font-semibold">Features</li>
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
            <li className="cursor-pointer text-fuchsia-700 font-semibold">Features</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Pricing</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Contact</li>
          </ul>
        </div>
      )}

      {/* Header Section */}
      <header className="mt-12 text-center">
        <h2 className="text-4xl font-bold text-fuchsia-900 mb-4">Our Features</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Social Ease helps you connect, schedule, and manage all your social media posts in one place — 
          saving you time and boosting productivity.
        </p>
      </header>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        <div className="bg-white/90 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCalendarAlt className="text-fuchsia-600 text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
          <p className="text-gray-600 text-sm">
            Plan posts ahead of time with our modern scheduling system and never miss your audience’s peak hours.
          </p>
        </div>

        <div className="bg-white/90 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCloudUploadAlt className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Easy Uploads</h3>
          <p className="text-gray-600 text-sm">
            Upload videos, images, and content directly with progress tracking for smooth and reliable posting.
          </p>
        </div>

        <div className="bg-white/90 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaYoutube className="text-red-600 text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">YouTube Integration</h3>
          <p className="text-gray-600 text-sm">
            Connect your YouTube account and schedule videos directly without ever leaving Social Ease.
          </p>
        </div>

        <div className="bg-white/90 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCheckCircle className="text-green-600 text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Auto Publishing</h3>
          <p className="text-gray-600 text-sm">
            Posts go live automatically at the scheduled time — no manual actions required.
          </p>
        </div>

        <div className="bg-white/90 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaBars className="text-purple-600 text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Multi-Platform</h3>
          <p className="text-gray-600 text-sm">
            Manage Instagram, Facebook, Twitter, and YouTube all in one intuitive dashboard.
          </p>
        </div>

        <div className="bg-white/90 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaTimes className="text-pink-600 text-4xl mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Handling</h3>
          <p className="text-gray-600 text-sm">
            Get clear alerts for failed uploads and easy re-try options with real-time feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
