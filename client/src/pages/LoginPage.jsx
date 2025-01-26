import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Success, Error } from "../components/ToastComp";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminkey, setAdminkey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { logIn } = useContext(AuthContext);

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
  };

  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          adminkey: isAdmin ? adminkey : undefined,
        }
      );

      const token = response.data.token;
      const userData = response.data.user;
      const Admin = response.data.user.isAdmin;

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isAdmin", Admin);

      logIn(token, userData, true, Admin);

      // Show success toast
      const firstName = response.data.user.fullname.split(" ")[0]; // Extract first name
      Success(`Hello, ${firstName}!`);

      // Navigate to the features page after successful login
      setTimeout(() => {
        navigate("/features");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      Error("Invalid email or password!");
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
        {/* Sign-In Card */}
        <div className="w-96 p-6 bg-white rounded-lg shadow-2xl border-t-4 border-[#81BFDA]">
          <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81BFDA]"
                  value={adminkey}
                  onChange={(e) => setAdminkey(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-[#81BFDA] text-white font-bold rounded-lg hover:bg-[#B1F0F7] transition"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm">New user?</span>
            <button
              className="text-[#81BFDA] font-bold ml-1 hover:underline"
              onClick={handleRegisterRedirect}
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
