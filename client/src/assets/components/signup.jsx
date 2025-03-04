// Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Signup() {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    user: "",
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
    <div className="bg-black text-white flex items-center justify-center min-h-screen transition-all">
      <motion.div
        className="relative bg-gray-800 bg-opacity-80 p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-lg border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              id="user"
              name="user"
              type="text"
              placeholder="Username"
              value={signupData.user}
              onChange={handleChange}
              className="peer p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            
            {/* <label htmlFor="user" className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-400 peer-not-empty:top-1 peer-not-empty:text-xs peer-not-empty:text-blue-400">
              
            </label> */}
          </div>
          
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleChange}
              className="peer p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {/* <label htmlFor="email" className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-400  peer-not-empty:top-1 peer-not-empty:text-xs peer-not-empty:text-blue-400">
              
            </label> */}
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleChange}
              className="peer p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {/* <label htmlFor="password" className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1  peer-focus:text-xs peer-focus:text-blue-400 peer-not-empty:top-1 peer-not-empty:text-xs peer-not-empty:text-blue-400">
              
            </label> */}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgb(59,130,246)" }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-lg transition"
          >
            Signup
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Already have an account? <Link to="/" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;