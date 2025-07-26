import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { ChatContext } from "../context/ChatContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, navigate} = useContext(ChatContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate('/'), 1500);
      } else {
         toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
       toast.error(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "anticipate" }}
    >
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md bg-white border border-indigo-300 rounded-2xl p-8 text-indigo-600">
          <h2 className="text-2xl font-semibold text-center mb-6 font-bricolage">
            Login to Your Account
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-indigo-800">
                Email
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 text-indigo-800">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md  "
            >
              Sign In
            </motion.button>
          </form>

          {/* Link to Signup */}
          <p className="text-sm text-center text-indigo-700 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-800 underline hover:text-indigo-900 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
