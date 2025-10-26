import React, { useState } from "react";

const countries = [
  "India",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Other"
]; // expand as needed

export default function OnboardingPage({ onComplete }) {
  const [handle, setHandle] = useState("");
  const [country, setCountry] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!country || !ageConfirmed || !consentGiven) {
      setError("Please fill all required fields and give consent.");
      return;
    }
    setError("");
    const userData = { handle, country, ageConfirmed, consentGiven };
    onComplete(userData); // send data to parent or backend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to MindConnect</h2>
        <p className="text-gray-700 mb-4 text-sm">
          MindConnect is a supportive community for sharing struggles and seeking support.
          Please read and accept the disclaimers and emergency protocol before continuing.
        </p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Anonymous Handle (optional)</label>
          <input
            type="text"
            placeholder="Your nickname"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Country *</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={ageConfirmed}
            onChange={() => setAgeConfirmed(!ageConfirmed)}
            className="mr-2"
          />
          <span>I confirm I am 18 years or older *</span>
        </div>

        <div className="mb-4 flex items-start">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={() => setConsentGiven(!consentGiven)}
            className="mr-2 mt-1"
          />
          <span className="text-sm">
            I have read and agree to the <strong>mental health disclaimers</strong> and
            <strong> emergency protocols *</strong>
          </span>
        </div>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
