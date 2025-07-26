import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ChatContext } from "../context/ChatContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, navigate} = useContext(ChatContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:3000/api/user/register`,
          { name, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
           if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful!");
          setTimeout(()=> navigate('/login'), 1000)
        } else {
          toast.error(response.data.message );
        }
      } catch (error) {
        console.log("Full error:", error);

        if (error.response) {
          // Server responded with error status
          const errorMessage = error.response.data?.message || "Registration failed";
          toast.error(errorMessage);  // This will show "User already exists"
        } else if (error.request) {
          // Request was made but no response
          toast.error("No response from server");
        } else {
          // Other errors
          toast.error("Registration error: " + error.message);
        }
      }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "anticipate" }}
      className="min-h-screen flex items-center justify-center bg-white px-4"
    >
      <div className="w-full max-w-md bg-white border border-indigo-300 rounded-2xl p-8   text-indigo-600">
        <h2 className="text-2xl font-semibold text-center mb-6 font-bricolage">
          Create Your Account
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-indigo-800">Name</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-indigo-800">Email</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md  "
          >
            Sign Up
          </motion.button>
        </form>

        {/* Link to Login */}
        <p className="text-sm text-center text-indigo-700 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-800 underline hover:text-indigo-900 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
