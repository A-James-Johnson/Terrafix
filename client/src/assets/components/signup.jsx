import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Signup() {
  const [signupData, setSignupData] = useState({
    user: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/signup", signupData);
      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 via-white to-blue-400 min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-white/80 backdrop-blur-lg p-10 rounded-xl shadow-xl w-full max-w-md border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            id="user"
            name="user"
            type="text"
            placeholder="Username"
            value={signupData.user}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md transition"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
