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
    <div className="bg-gradient-to-bl from-blue-200 via-white to-blue-400 min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-white/80 backdrop-blur-lg p-10 rounded-xl shadow-xl w-full max-w-md border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Welcome Back</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
          <motion.button
            type="button"
            onClick={handleLogin}
            whileHover={{ scale: 1.03 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md transition"
          >
            Login
          </motion.button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
