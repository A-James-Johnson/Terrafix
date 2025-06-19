import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { clearItem } from '../mockdata/cartSlice';
//import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import baseURL from "./baseURL";

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const code=localStorage.getItem("terraformcode");
    if(code){
      localStorage.removeItem("terraformcode");
    }
   

    if (token) {
      localStorage.removeItem("accessToken");
      console.log("Token cleared on login page visit");
    }
    
    
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = () => {
    fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.accessToken) {
           localStorage.setItem("accessToken", data.accessToken);
           localStorage.setItem("user", JSON.stringify(data.user));
          console.log("data.user",data.user);
          navigate("/home");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => console.error("Login error:", error));
  };

  return (
    
    <div className="bg-gradient-to-bl from-blue-200 via-white to-blue-400 min-h-screen flex items-center justify-center">
        {/* TerraFix heading at the top */}
      <h1 className="absolute top-14 text-6xl font-extrabold text-blue-800 tracking-tight">
        TerraFix
      </h1>
      <motion.div
        className="bg-white/80 backdrop-blur-lg p-10 rounded-xl shadow-xl w-full max-w-md border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         {/* 🔷 Terrafix Heading */}
       
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Welcome Back</h2>
        <form onSubmit={handlesubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            type="submit"
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
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
