import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import studentImage from "../../assets/student.png";
import * as Icons from "@mui/icons-material";
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

  const handlefeatures = () => {
    navigate("/features");
    setMenuOpen(false);
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
      <nav className="flex justify-between items-center px-6 py-4 bg-teal-700 shadow-md border-b border-teal-600">
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
          <span className="text-2xl text-white drop-shadow-md">
            aDApt
          </span>
        </div>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-md rounded-lg transition duration-300 shadow-md flex items-center gap-2 focus:outline-none"
            onClick={toggleMenu}
          >
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <Icons.PersonAddAlt />
                  {userData.fullname.split(" ")[0]}
                </>
              ) : (
                <>
                  <Icons.PersonOutline />
                  {userData.fullname.split(" ")[0]}
                </>
              )
            ) : (
              "Get Started"
            )}
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-10 z-50">
              <ul className="divide-y divide-gray-200">
                <li
                  className="px-4 py-3 hover:bg-yellow-50 cursor-pointer flex items-center gap-2 text-teal-700"
                  onClick={handleEmailsClick}
                >
                  <Icons.MarkEmailUnread />
                  <span className="font-medium">Imp Emails</span>
                </li>
                <li
                  className="px-4 py-3 hover:bg-yellow-50 cursor-pointer flex items-center gap-2 text-teal-700"
                  onClick={handlefeatures}
                >
                  <Icons.Category />
                  <span className="font-medium">Features</span>
                </li>
                <li
                  className="px-4 py-3 hover:bg-yellow-50 cursor-pointer flex items-center gap-2 text-teal-700"
                  onClick={handleLogout}
                >
                  <Icons.Logout />
                  <span className="font-medium">Logout</span>
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
