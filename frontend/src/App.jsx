import { BrowserRouter, Routes, Route } from "react-router-dom";
import Createform from "./components/Createform";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import PricingPage from "./components/PricingPage";

export default function App() {

  function FeaturesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
      🚀 Features Page Coming Soon
    </div>
  );
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createform />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
