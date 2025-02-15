import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComp from "./components/HomePage/NavbarComp";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FeaturesPage from "./pages/FeaturesPage";
import ImpEmailsPage from "./pages/ImpEmailsPage";
import LostNFoundPage from "./pages/LostNFoundPage";
import QNAManagerPage from "./pages/QNAManagerPage";
import SharedResLibPage from "./pages/SharedResLibPage";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComp /> {/* Navbar component will have access to AuthContext */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/emails" element={<ImpEmailsPage />} />
        <Route path="/lostnfound" element={<LostNFoundPage/>}/>
        <Route path="/QnA" element={<QNAManagerPage/>}/>
        <Route path="/sharedreslib" element={<SharedResLibPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
