import React from "react";
import studentImage from "../../assets/student.png";
import { useNavigate } from "react-router-dom";

const NavbarComp = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      {/* NAVBAR SECTION */}
      <nav className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        {/* Logo Section */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <img
              src={studentImage}
              alt="Student Logo"
              className="object-cover"
            />
          </div>
          <span className="text-xl font-semibold text-black">
            aDApt
          </span>
        </div>
        {/* Register Button */}
        <button
          className="px-4 py-2 bg-black text-white font-medium rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none"
          onClick={handleRegister}
        >
          Register
        </button>
      </nav>
    </div>
  );
};

export default NavbarComp;
