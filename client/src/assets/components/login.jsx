import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:9000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid credentials");
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
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Floating Labels */}
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-3 top-3 text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-400"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-400"
            >
              Password
            </label>
          </div>

          {/* Login Button with Glow Effect */}
          <motion.button
            type="button"
            onClick={handleLogin}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgb(59,130,246)" }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-lg transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account? {" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;