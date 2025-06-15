import React, { useState, useEffect } from "react";
import DashboardNavigater from "../DashboardNavigater";
import { useAuth } from "../../../context/AuthContext.js";
import axios from "axios";
import api from "../../../services/api.js";

const AdminSettings = () => {
  const { user ,updateUser  } = useAuth(); // Get user from context but avoid using setUser
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const handleEdit = () => setEditMode(true);

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
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
  };

  const handleSave = async () => {
    if (error) return; // Don't allow save if there's an error
  
    try {
    //  const response = await axios.put( `http://localhost:5000/api/users/${user.id}`, userData);
   const response = await api.put( `/users/${user.id}`, userData);
      const updatedUser = response.data.data;
      setUserData(updatedUser);
      updateUser(updatedUser); // Ensure user state updates
  
      setEditMode(false);
      setError(""); 
      setSuccess("Profile updated successfully!"); // Show success message
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Unable to update user details. Please try again.");
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavigater />
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Admin Settings</h2>
          <p className="mt-2 text-lg">Manage your account and settings.</p>
        </div>

        {/* Account Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">Account Information</h3>

          {editMode ? (
            <div className="mt-4 space-y-4">
              {/* Editable Fields */}
              <div className="flex flex-col">
                <label className="text-gray-600">Username:</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handlePhoneChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>

              {/* Error & Success Messages */}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary1 text-white rounded-md shadow-md hover:bg-orange-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {/* Non-editable Fields */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Username:</span>
                <span className="font-medium text-gray-800">{userData.name || "admin"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-800">{userData.email || "admin@example.com"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-800">{userData.phone || "Not Set"}</span>
              </div>

              <button
                onClick={handleEdit}
                className="mt-6 px-4 py-2 bg-primary1 text-white rounded-md shadow-md hover:bg-orange-600"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
