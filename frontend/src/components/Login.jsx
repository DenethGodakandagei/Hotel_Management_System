import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.js';
import api from "../services/api";

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
     // const response = await axios.post("http://localhost:5000/api/auth/login", userData);
     const response = await api.post("/auth/login", userData);
  
      const user = response.data.user;
      login(user);
      
  
      setSuccess("Login successful!");
      setError("");
  
      // Navigate based on user role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }else if(user.role === "staff"){
        navigate("/staff/dashboard");
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
   <div className="flex items-center justify-between w-full p-3">
       <div className='flex '>
         <img src={logo} alt="Logo" style={{ width: "70px" }} />
         <span className=" pt-5 text-xl font-semibold text-primary1">
               LuxeStay
             </span>
       </div>
       <Link to={"/"}>
         <div className="p-2 m-3 border border-solid rounded-md border-primary1 ">
           <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
         </div>
       </Link>
     </div>
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-primary1 font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary1 text-white py-2 rounded-md hover:bg-primary1"
        >
          Login
        </button>
        <div className="flex text-center mt-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
        </div>
        <div className="flex items-center justify-center mt-6">
           
           <Link to="/signup" className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-900 dark:hover:text-black">
             <span className="ml-2">You don&#x27;t have an account?</span>
           </Link>
        
       </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
