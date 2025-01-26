import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import studentImage from "../../assets/student.png";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { AuthContext } from "../../context/AuthContext";

const NavbarComp = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Assuming isLoggedIn is a boolean value from the AuthContext
  const { isAdmin, isLoggedIn, userData, logout } = useContext(AuthContext); // Correctly destructure the context

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleEmailsClick = () => {
    navigate("/emails"); // Navigate to /emails route
    setMenuOpen(false); // Close dropdown when clicking on emails
  };

  const toggleMenu = () => {
    if (isLoggedIn) {
      setMenuOpen(!menuOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(!menuOpen);
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
          <span className="text-xl font-semibold text-black">aDApt</span>
        </div>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            className="px-4 py-2 bg-black text-white font-medium rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none flex items-center gap-2"
            onClick={toggleMenu}
          >
            {isLoggedIn
              ? isAdmin
                ? `BAPU BAPU${userData.fullname}`
                : userData.fullname
              : "Get Started"}
            {/* above fucntionality not wokrking */}
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-xl rounded-sm z-50">
              <ul className="flex flex-col divide-y divide-gray-200">
                <li
                  className="hover:bg-gray-50 px-4 py-2 cursor-pointer flex items-center gap-2"
                  onClick={handleEmailsClick}
                >
                  <MarkEmailUnreadIcon />
                  <span className="block text-gray-800 font-medium">
                    Imp Emails
                  </span>
                </li>
                <li
                  className="hover:bg-gray-50 px-4 py-2 cursor-pointer flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <MarkEmailUnreadIcon />
                  <span className="block text-gray-800 font-medium">
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarComp;
