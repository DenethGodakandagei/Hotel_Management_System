import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import axios from "axios";

const StaffRegistration = () => {
    

    const [userData, setUserData] = useState({
      name: "",
      email: "",
      password: "",
      profile: "",
      role: "guest",
      phone: "",
      address: "",
    });
  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validatePhoneNumber = (phone) => {
      // Sri Lanka phone number pattern with spaces (XXX XXXX XXX)
      const sriLankaPhoneRegex = /^(?:\+94|0)7[0125678] \d{4} \d{3}$/;
    
      setError(sriLankaPhoneRegex.test(phone) ? "" : "Invalid phone number");
    };
    
    const formatPhoneNumber = (value) => {
      let digitsOnly = value.replace(/\D/g, ""); // Remove non-numeric characters
    
      if (digitsOnly.length > 3 && digitsOnly.length <= 7) {
        return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3)}`;
      } else if (digitsOnly.length > 7) {
        return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 7)} ${digitsOnly.slice(7)}`;
      }
    
      return digitsOnly;
    };
    
    
    const handleChange = (e) => {
      const { name, value } = e.target;
  let updatedValue = value;

  if (name === "phone") {
    updatedValue = formatPhoneNumber(value);
    validatePhoneNumber(updatedValue);
  }
  
      if (name === "role") {
        if (value === "staff") {
          setUserData({
            ...userData,
            role: value,
            staffRole: "manager",
          });
        } else {
          setUserData({
            ...userData,
            role: value,
          });
        }
      } else {
        setUserData({
          ...userData,
          [name]: value,
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        //  register the user
        const userResponse = await axios.post(
          "http://localhost:5000/api/auth/register",
          userData
        );
  
        // Handle successful registration
        setSuccess("User registered successfully!");
  
        if (userData.role === "staff") {
          const staffData = {
            userId: userResponse.data.user.id,
            salary: 0,
            role: userData.staffRole,
          };
  
          // Send the staff data to the backend
          await axios.post("http://localhost:5000/api/staff", staffData);
  
          setSuccess("Staff registered successfully!");
          
        }
  
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Error registering user.");
        setSuccess("");
      }
    };
  return (
    <div>
       <div>
            <div className="flex items-center justify-between w-full">
              <div>
                <img src={logo} alt="Logo" style={{ width: "70px" }} />
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
                  <label className="block text-gray-700">Role</label>
                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
                  >
                    <option value="guest">Guest</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
      
                {/* Show staff role dropdown only if the user selects staff */}
                {userData.role === "staff" && (
                  <div className="mb-4">
                    <label className="block text-gray-700">Staff Role</label>
                    <select
                      name="staffRole"
                      value={userData.staffRole}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary1"
                    >
                      <option value="manager">Manager</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="housekeeping">Housekeeping</option>
                      <option value="chef">Chef</option>
                    </select>
                  </div>
                )}
      
                <div className="mb-4">
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    maxLength={10}
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
              </form>
            </div>
          </div>
    </div>
  )
}

export default StaffRegistration
