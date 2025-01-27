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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              value={userData.phone}
              onChange={handleChange}
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
