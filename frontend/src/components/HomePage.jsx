import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isYoutubeConnected, setIsYoutubeConnected] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // 🔹 Check YouTube status from backend
  useEffect(() => {
    fetch("https://social-backend-fgha.onrender.com/status/youtube")
      .then((res) => res.json())
      .then((data) => setIsYoutubeConnected(data.connected))
      .catch((err) => console.error("Error checking YouTube status:", err));
  }, []);

  const handleYoutubeLogin = () => {
    window.open("https://social-backend-fgha.onrender.com/auth/google", "_self");
  };

  const goToPostPage = () => {
    window.location.href = "/create";
  };

  // 🔹 Show modal for paid platforms
  const handlePaidPlatformClick = () => {
    setShowPricingModal(true);
  };

  return (
    <div className="min-h-screen relative text-gray-800">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <nav className="p-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-fuchsia-950 tracking-tight">
          Social Ease
        </h1>
        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
  <li>
    <Link to="/" className="cursor-pointer hover:text-gray-900 transition">
      Home
    </Link>
  </li>
  <li>
    <Link to="/features" className="cursor-pointer hover:text-gray-900 transition">
      Features
    </Link>
  </li>
  <li>
    <Link to="/pricing" className="cursor-pointer hover:text-gray-900 transition">
      Pricing
    </Link>
  </li>
  <li>
    <Link to="/contact" className="cursor-pointer hover:text-gray-900 transition">
      Contact
    </Link>
  </li>
</ul>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-b animate-fade-in-down transition duration-300 ease-out">
          <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
  <li>
    <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-900 transition">
      Home
    </Link>
  </li>
  <li>
    <Link to="/features" onClick={() => setMenuOpen(false)} className="hover:text-gray-900 transition">
      Features
    </Link>
  </li>
  <li>
    <Link to="/pricing" onClick={() => setMenuOpen(false)} className="hover:text-gray-900 transition">
      Pricing
    </Link>
  </li>
  <li>
    <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-900 transition">
      Contact
    </Link>
  </li>
</ul>

        </div>
      )}

      {/* Hero */}
      <div className="flex flex-col items-center mt-12 px-4 text-center">
        <div className="max-w-xl bg-white/90 border border-gray-200 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-fuchsia-900">Welcome!</h2>
          <p className="text-gray-600 mb-2">Link your social accounts</p>
          <p className="text-gray-600 mb-2">Schedule your posts effortlessly</p>
          <p className="text-gray-600">Sit back, relax, and let us handle the rest!</p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-gray-800">
          Connect Your Social Accounts
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full max-w-6xl">
          {/* YouTube */}
          <div className="border border-gray-200 rounded-2xl p-6 h-48 bg-white/90 shadow-md hover:shadow-xl transition mx-auto w-full max-w-xs">
            <div className="flex flex-col items-center justify-center h-full">
              <FaYoutube className="text-red-600 text-4xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">YouTube</h3>
              <button
                onClick={isYoutubeConnected ? goToPostPage : handleYoutubeLogin}
                className={`mt-2 px-5 py-2 rounded-lg text-white transition font-medium shadow-sm 
                  ${isYoutubeConnected ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              >
                {isYoutubeConnected ? "Post Video" : "Link Account"}
              </button>
            </div>
          </div>

          {/* Instagram */}
          <div className="border border-gray-200 rounded-2xl p-6 h-48 bg-white/90 shadow-md hover:shadow-xl transition mx-auto w-full max-w-xs">
            <div className="flex flex-col items-center justify-center h-full">
              <FaInstagram className="text-pink-600 text-4xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Instagram</h3>
              <button
                onClick={handlePaidPlatformClick}
                className="mt-2 px-5 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white transition font-medium shadow-sm"
              >
                Link Account
              </button>
            </div>
          </div>

          {/* Twitter */}
          <div className="border border-gray-200 rounded-2xl p-6 h-48 bg-white/90 shadow-md hover:shadow-xl transition mx-auto w-full max-w-xs">
            <div className="flex flex-col items-center justify-center h-full">
              <FaTwitter className="text-blue-500 text-4xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Twitter</h3>
              <button
                onClick={handlePaidPlatformClick}
                className="mt-2 px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition font-medium shadow-sm"
              >
                Link Account
              </button>
            </div>
          </div>

          {/* Facebook */}
          <div className="border border-gray-200 rounded-2xl p-6 h-48 bg-white/90 shadow-md hover:shadow-xl transition mx-auto w-full max-w-xs">
            <div className="flex flex-col items-center justify-center h-full">
              <FaFacebook className="text-blue-600 text-4xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Facebook</h3>
              <button
                onClick={handlePaidPlatformClick}
                className="mt-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition font-medium shadow-sm"
              >
                Link Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPricingModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-fuchsia-900 mb-4 text-center">
              Choose Your Plan
            </h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold">Monthly</h3>
                <p className="text-gray-600">₹299 / month</p>
                <button className="mt-2 w-full bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700">
                  Subscribe
                </button>
              </div>
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold">Yearly</h3>
                <p className="text-gray-600">₹230 × 12 = ₹2760 / year</p>
                <button className="mt-2 w-full bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 py-6 border-t text-center text-gray-600 text-sm bg-white/80 backdrop-blur-md">
        © {new Date().getFullYear()} Social Ease. All rights reserved.
      </footer>
    </div>
  );
}
