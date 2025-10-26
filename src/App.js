import React, { useState, useEffect } from "react";
import OnboardingWizard from "./pages/OnboardingWizard";
import StoriesPage from "./pages/StoriesPage";
import ChatPage from "./pages/ChatPage";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  // Load user from localStorage if returning
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save user to localStorage after onboarding
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Protect routes: require onboarding first
  const RequireOnboarding = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Onboarding */}
        <Route path="/" element={!user ? <OnboardingWizard onComplete={setUser} /> : <Navigate to="/stories" />} />

        {/* Stories Page */}
        <Route
          path="/stories"
          element={
            <RequireOnboarding>
              <StoriesPage user={user} />
            </RequireOnboarding>
          }
        />

        {/* Chat Page */}
        <Route
          path="/chat"
          element={
            <RequireOnboarding>
              <ChatPage user={user} />
            </RequireOnboarding>
          }
        />

        {/* Moderator Dashboard */}
        <Route path="/moderator" element={<ModeratorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
