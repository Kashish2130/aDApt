import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComp from "./components/HomePage/NavbarComp";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FeaturesPage from "./pages/FeaturesPage";
import ImpEmailsPage from "./pages/ImpEmailsPage";

const App = () => {
  return (
    <Router>
      <NavbarComp /> {/* Navbar component will have access to AuthContext */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/emails" element={<ImpEmailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
