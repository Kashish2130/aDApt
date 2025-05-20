import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Success, Error } from "../components/ToastComp";
import { AuthContext } from "../context/AuthContext";
import * as Icons from "@mui/icons-material";

const RegisterPage = () => {
  const { logIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    adminkey: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Admin Toggle
  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
    setFormData({ ...formData, adminkey: "" }); // Clear admin key if admin is toggled off
  };

  // Handle Signup Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          adminkey: isAdmin ? formData.adminkey : undefined,
        }
      );

      console.log(response);

      const token = response.data.token;
      const userData = response.data.user;
      const Admin = response.data.user.isAdmin;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userData", JSON.stringify(userData));
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("isAdmin", Admin);

      logIn(token, userData, true, Admin);

      Success("Welcome to aDApt!");

      setTimeout(() => {
        navigate("/features");
      }, 2000);
    } catch (error) {
      Error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar Section */}
      {/* <NavbarComp /> */}
      {/* Toast Container */}
      <Toaster />
      {/* Remaining Space for the Form */}
      <div
        className="flex-grow flex items-center justify-center bg-gradient-to-r from-[#B1F0F7] via-[#81BFDA] via-[#F5F0CD] to-[#FADA7A] m-3"
        style={{ fontFamily: "'Grandstander Variable', system-ui" }}
      >
        {/* Registration Card */}
        <div className="w-96 p-6 bg-white rounded-lg shadow-2xl border-t-4 border-[#81BFDA]">
          <h2 className="text-2xl font-bold text-center mb-4">
            Create Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA]"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA] pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-3 text-gray-500"
              >
                {showPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />}
              </button>
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium mr-2">Admin?</label>
              <button
                type="button"
                className={`px-4 py-1 border rounded-lg ${
                  isAdmin ? "bg-[#81BFDA] text-white" : "bg-gray-200"
                }`}
                onClick={handleAdminToggle}
              >
                {isAdmin ? "Yes" : "No"}
              </button>
            </div>
            {isAdmin && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Admin Key
                </label>
                <input
                  type="password"
                  name="adminkey"
                  value={formData.adminkey}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA]"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-[#81BFDA] text-white font-bold rounded-lg hover:bg-[#B1F0F7] transition"
            >
              Create Account
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm">Already have an account?</span>
            <button
              className="text-[#81BFDA] font-bold ml-1 hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
