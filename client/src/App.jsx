import React from "react";
import { AnimatePresence } from "framer-motion";
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
import Add_Edit_Item_Page from "./pages/Add_Edit_Item_Page";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComp /> {/* Navbar component will have access to AuthContext */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/emails" element={<ImpEmailsPage />} />
          <Route path="/lostnfound" element={<LostNFoundPage />} />
          <Route path="/QnA" element={<QNAManagerPage />} />
          <Route path="/sharedreslib" element={<SharedResLibPage />} />
          <Route path="/add-edit-item" element={<Add_Edit_Item_Page />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
