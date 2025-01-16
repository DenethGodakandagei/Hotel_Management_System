import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.js";
import ViewRooms from "../Admin/RoomManage/ViewRooms.jsx";
import ManageMenu from "../Admin/MenuManage/ManageMenu.jsx";
import AllReservations from "../Admin/ReservationManage/AllReservations.jsx";
import ViewMenu from "../Admin/MenuManage/ViewMenu.jsx";

const StaffDashboard = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [staffRole, setStaffRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("ViewRooms");
  const [activeTabrep, setActiveTabrep] = useState("AllReservations");

  const ActiveTabManager = () => {    //Manager Active Tabs
    switch (activeTab) {
      case "ViewRooms":
        return <ViewRooms />;
      case "AllReservations":
        return <AllReservations />;
      case "ViewMenu":
        return <ViewMenu />;
      default:
        return <ViewRooms />;
    }
  };

  const ActiveTabReceptionist = () => {      // Receptionist Active Tabs
    if (activeTabrep === "AllReservations") {
      return <AllReservations />;
    } else if (activeTabrep === "ViewRooms") {
      return <ViewRooms />;
    }
  };

  useEffect(() => {
    // Fetch staff role based on user ID
    const fetchStaffRole = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/staff/${user.id}`
        );
        setStaffRole(response.data.role);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch staff role.");
        setStaffRole("");
      } finally {
        setLoading(false);
      }
    };

    fetchStaffRole();
  }, [user.id]);

  // Render staff role content
  const renderRoleSpecificContent = () => {
    switch (staffRole) {

    /* Manager Dashbord   */
      case "manager":
        return (
          <div>
            {/* Header Section */}
            <div className="flex justify-between bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Manager Dashboard</h2>
              <button className="text-2xl border border-white rounded-md p-2 font-bold hover:scale-105 transition-transform">
                Add Room
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-around bg-orange-100 rounded p-4">
              {/* Room Navigation */}
              <button
                onClick={() => setActiveTab("ViewRooms")}
                className={`text-xl font-bold p-2 ${
                  activeTab === "ViewRooms"
                    ? "bg-orange-600 text-white rounded-md"
                    : "text-gray-700"
                }`}
              >
                View Rooms
              </button>
              {/* Reservation Navigation */}
              <button
                onClick={() => setActiveTab("AllReservations")}
                className={`text-xl font-bold p-2 ${
                  activeTab === "AllReservations"
                    ? "bg-orange-600 text-white rounded-md "
                    : "text-gray-700"
                }`}
              >
                All Reservations
              </button>
              {/* Menu Navigation */}
              <button
                onClick={() => setActiveTab("ViewMenu")}
                className={`text-xl font-bold p-2 ${
                  activeTab === "ViewMenu"
                    ? "bg-orange-600 text-white rounded-md"
                    : "text-gray-700"
                }`}
              >
                View Menu
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4">{ActiveTabManager()}</div>
          </div>
        );

   /* receptionist Dashbord   */    
      case "receptionist":
        return (
          <div>
            {/* Header Section */}
            <div className="flex justify-between bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Receptionist Dashboard</h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-around bg-orange-100 rounded p-4">
              <button
                onClick={() => setActiveTabrep("AllReservations")}
                className={`text-xl font-bold p-2 ${
                  activeTabrep === "AllReservations"
                    ? "bg-orange-600 text-white rounded-md"
                    : "text-gray-700"
                }`}
              >
                All Reservations
              </button>
              <button
                onClick={() => setActiveTabrep("ViewRooms")}
                className={`text-xl font-bold p-2 ${
                  activeTabrep === "ViewRooms"
                    ? "bg-orange-600 text-white rounded-md"
                    : "text-gray-700"
                }`}
              >
                View Rooms
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4">{ActiveTabReceptionist()}</div>
          </div>
        );

   /* housekeeping Dashboard */
      case "housekeeping":
        return (
          <div>
            <div className="flex justify-between bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Housekeeping Dashboard</h2>
            </div>
          </div>
        );

  /* Chef Dashboard */
      case "chef":
        return (
          <div>
             {/* Header Section */}
             <div className="flex justify-between bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Chef Dashboard</h2>
            </div>
            <ViewMenu />
          </div>
        );
      default:
        return <div>No role-specific content available.</div>;
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        renderRoleSpecificContent()
      )}
    </div>
  );
};

export default StaffDashboard;
