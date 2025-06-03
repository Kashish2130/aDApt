import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import studentImage from "../../assets/student.png";
import * as Icons from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";
import { motion, AnimatePresence } from "framer-motion";

const NavbarComp = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef(null);

  // Assuming isLoggedIn is a boolean value from the AuthContext
  const { isAdmin, isLoggedIn, userData, logout } = useContext(AuthContext); // Correctly destructure the context

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  // Auto-close dropdown after 2.5s if open and not interacted
  useEffect(() => {
    if (menuOpen) {
      closeTimer.current = setTimeout(() => {
        setMenuOpen(false);
      }, 2500);
    } else {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [menuOpen]);

  const handleEmailsClick = () => {
    navigate("/emails");
    setMenuOpen(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handlefeatures = () => {
    navigate("/features");
    setMenuOpen(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
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
    setMenuOpen(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
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
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
                className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-10 z-50"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComp;
