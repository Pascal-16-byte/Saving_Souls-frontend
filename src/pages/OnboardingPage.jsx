import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    handle: "",
    country: "",
    ageConfirmed: false,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ageConfirmed || !form.consent) {
      alert("Please confirm consent and age before continuing.");
      return;
    }
    localStorage.setItem("mind_user", JSON.stringify(form));
    navigate("/stories");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-800 to-purple-800 text-white px-4">
      <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to MindConnect 🕊️</h1>

        <p className="text-sm text-gray-600 mb-4">
          <strong>Disclaimer:</strong> MindConnect is not a crisis helpline or a substitute
          for professional therapy. If you are in danger or need urgent help, please reach
          out to your local mental health helpline immediately.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Choose an Anonymous Handle</label>
            <input
              type="text"
              name="handle"
              value={form.handle}
              onChange={handleChange}
              placeholder="e.g., CalmSoul_42"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="e.g., India"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="ageConfirmed"
                checked={form.ageConfirmed}
                onChange={handleChange}
              />
              <span className="text-sm">I confirm that I am 18 years or older.</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />
              <span className="text-sm">
                I understand and consent to community moderation and AI-assisted safety protocols.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
