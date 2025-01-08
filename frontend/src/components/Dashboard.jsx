import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      // Redirect to login if no user is found
      navigate("/signin");
    } else {
      // Set user data if authenticated
      setUserData(user);
      setError(""); // Clear any previous errors
    }
  }, [navigate, user]);

  return (
    <div className="flex h-screen bg-gray-100">
  {/* Sidebar */}
  <div className="w-1/4 bg-white shadow-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h2>
    {error && <p className="text-red-500 mb-4">{error}</p>}

    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={userData?.name || ""}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={userData?.email || ""}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>


      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
        <input
          type="text"
          value={userData?.role || "guest"}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
        <input
          type="text"
          value={userData?.phone || ""}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
        <textarea
          value={userData?.address || ""}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>
    </div>

    <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
      Edit Profile
    </button>
  </div>

  {/* Main Content */}
  <div className="flex-1 p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600">Main content goes here...</p>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
