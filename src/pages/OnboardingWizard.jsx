import React, { useState } from "react";

const countries = ["India", "USA", "UK", "Canada", "Australia", "Other"];

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [handle, setHandle] = useState("");
  const [country, setCountry] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => {
    if (step === 1 && !consentGiven) {
      setError("You must agree to the disclaimers to continue.");
      return;
    }
    if (step === 2 && (!country || !ageConfirmed)) {
      setError("Please fill all required fields to continue.");
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    onComplete({ handle, country, ageConfirmed, consentGiven });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome to MindConnect</h2>
            <p className="text-gray-700 mb-4 text-sm">
              MindConnect is a supportive community for sharing struggles. Please read and accept disclaimers and emergency protocols.
            </p>
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={() => setConsentGiven(!consentGiven)}
                className="mr-2 mt-1"
              />
              <span className="text-sm">
                I agree to the <strong>mental health disclaimers</strong> and <strong>emergency protocols</strong>
              </span>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={() => setAgeConfirmed(!ageConfirmed)}
                className="mr-2"
              />
              <span>I confirm I am 18 years or older *</span>
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
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block mb-1 font-medium">Anonymous Handle (optional)</label>
            <input
              type="text"
              placeholder="Your nickname"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Progress Bar */}
        <div className="w-full bg-gray-300 h-2 rounded mb-6">
          <div
            className="bg-indigo-600 h-2 rounded"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {renderStep()}

        {error && <div className="text-red-600 mt-2">{error}</div>}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
