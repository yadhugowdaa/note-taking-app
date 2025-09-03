import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage'; // Import the new LoginPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Connect the route */}
      </Routes>
    </Router>
  );
}

export default App;