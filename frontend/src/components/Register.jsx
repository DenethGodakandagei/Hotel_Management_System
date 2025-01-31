import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    // General email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  };
  const validatePhoneNumber = (phone) => {
    // Sri Lanka phone number pattern
    const sriLankaPhoneRegex = /^(?:\+94|0)(?:7[0125678]\d{7}|[1-9]\d{8})$/;
  
    if (!sriLankaPhoneRegex.test(phone.replace(/\s/g, ""))) {
      // Remove spaces before validation
      setError("Invalid phone number");
    } else {
      setError("");
    }
  };
  
  const handlePhoneChange = (e) => {
    let { name, value } = e.target;
  
    // Remove non-numeric characters except '+'
    value = value.replace(/\D/g, "");
  
    // Apply formatting: 076 8250 161
    if (value.length > 3 && value.length <= 7) {
      value = `${value.slice(0, 3)} ${value.slice(3)}`;
    } else if (value.length > 7) {
      value = `${value.slice(0, 3)} ${value.slice(3, 7)} ${value.slice(7)}`;
    }
  
    setUserData({ ...userData, [name]: value });
  
    // Validate phone number (after removing spaces)
    validatePhoneNumber(value.replace(/\s/g, ""));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "email") {
      validateEmail(value); // Validate email
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    try {
      // Register the user
      const userResponse = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );

      // Handle successful registration
      setSuccess("User registered successfully!");
      setError("");

      // Navigate to the /signin page
      setTimeout(() => {
        navigate("/signin");
      }, 1000); // Adding a slight delay to display the success message
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user.");
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
        <h2 className="text-2xl text-primary1 font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Profile (optional)</label>
            <input
              type="text"
              name="profile"
              value={userData.profile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              maxlength="12"
              value={userData.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary1 text-white py-2 rounded-md hover:bg-primary1"
          >
            Register
          </button>
          <div className="flex text-center mt-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
          </div>
          <div className="flex items-center justify-center mt-6">
            <Link
              to="/signin"
              className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-900 dark:hover:text-black"
            >
              <span className="ml-2">Already have an account ?</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;