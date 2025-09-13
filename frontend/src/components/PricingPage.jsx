import React from "react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
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

      {/* Page Content */}
      <main className="flex-1 flex flex-col items-center py-16 px-6">
        <h1 className="text-4xl font-bold text-fuchsia-900 mb-6">Pricing Plans</h1>
        <p className="text-gray-600 text-lg text-center max-w-2xl mb-12">
          Choose the plan that fits your needs. Start free with YouTube posting,
          or unlock Instagram, Twitter, and Facebook with Pro plans.
        </p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Free Plan */}
          <div className="border border-gray-200 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Free</h2>
            <p className="text-gray-600 mb-6">Perfect for starters</p>
            <h3 className="text-3xl font-extrabold mb-6">₹0</h3>
            <ul className="text-gray-600 mb-8 space-y-2 text-sm">
              <li>✔️ Post to YouTube</li>
              <li>❌ Instagram, Twitter, Facebook</li>
              <li>❌ Advanced scheduling</li>
            </ul>
            <button className="px-6 py-2 rounded-lg bg-gray-500 text-white font-semibold cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Monthly Plan */}
          <div className="border-2 border-fuchsia-600 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition relative">
            <span className="absolute top-0 right-0 bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-2xl">
              Popular
            </span>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Pro Monthly</h2>
            <p className="text-gray-600 mb-6">For growing creators</p>
            <h3 className="text-3xl font-extrabold mb-6">₹299 <span className="text-base text-gray-500">/month</span></h3>
            <ul className="text-gray-600 mb-8 space-y-2 text-sm">
              <li>✔️ Post to YouTube</li>
              <li>✔️ Instagram, Twitter, Facebook</li>
              <li>✔️ Scheduling & automation</li>
            </ul>
            <button className="px-6 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold transition">
              Subscribe
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="border border-gray-200 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Pro Yearly</h2>
            <p className="text-gray-600 mb-6">Best value</p>
            <h3 className="text-3xl font-extrabold mb-6">₹3588 <span className="text-base text-gray-500">/year</span></h3>
            <ul className="text-gray-600 mb-8 space-y-2 text-sm">
              <li>✔️ Post to YouTube</li>
              <li>✔️ Instagram, Twitter, Facebook</li>
              <li>✔️ Scheduling & automation</li>
            </ul>
            <button className="px-6 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold transition">
              Subscribe
            </button>
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
