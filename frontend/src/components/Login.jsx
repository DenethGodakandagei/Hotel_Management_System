import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.js';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", userData);
  
      const user = response.data.user;
      login(user);
      
  
      setSuccess("Login successful!");
      setError("");
  
      // Navigate based on user role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in.");
      setSuccess("");
    }
  };

  return (
    <div>
    <div className="flex items-center justify-between w-full">
    <div>
      <img src={logo} alt="Logo" style={{ width: "70px" }} />
    </div>
    <Link to={"/"}>
      <div className="p-2 m-3 border border-solid rounded-md border-orange-500 ">
        <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
      </div>
    </Link>
  </div>
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-orange-500 font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Login
        </button>
        <div className="flex text-center mt-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
