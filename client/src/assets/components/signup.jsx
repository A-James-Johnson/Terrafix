import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import { clearItem } from '../mockdata/cartSlice';
// import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import baseURL from "./baseURL";
const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      localStorage.removeItem("accessToken");
      console.log("Token cleared on signup page visit");
    }

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage("All fields are required");
      return;
    }
    signup();
  };

  const signup = () => {
    fetch(`${baseURL}/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.message === "Signed up successfully" && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/home");
        } else {
          alert(data.message || "Signup failed");
        }
      })
      .catch((error) => console.error("Signup error:", error));
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 via-white to-blue-400 min-h-screen flex items-center justify-center">

      <h1 className="absolute top-14 text-6xl font-extrabold text-blue-800 tracking-tight">
        TerraFix
      </h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg p-10 rounded-xl shadow-xl w-full max-w-md border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Create Your Account</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md transition"
        >
          Signup
        </motion.button>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </motion.form>
    </div>
  );
};

export default Signup;
