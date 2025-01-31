import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import { useAuth } from "../../context/AuthContext.js";
import ViewRooms from "../Admin/RoomManage/ViewRooms.jsx";
import AllReservations from "../Admin/ReservationManage/AllReservations.jsx";
import ViewMenu from "../Admin/MenuManage/ViewMenu.jsx";
import AddRooms from "../Admin/RoomManage/AddRooms.jsx";


const StaffDashboard = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [staffRole, setStaffRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("ViewRooms");
  const [activeTabrep, setActiveTabrep] = useState("AllReservations");
  const [showModal, setShowModal] = useState(false); 
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

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
            <div className="flex items-center justify-between w-full p-3">
              <div className='flex '>
                <img src={logo} alt="Logo" style={{ width: "70px" }} />
                <span className=" pt-5 text-xl font-semibold text-primary1">
                  LuxeStay
                </span>
              </div>
              <div className="flex ">
                <Link to={"/"}>
                  <div className="p-2 m-3 border border-solid rounded-md border-primary1 ">
                    <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
                  </div>
                </Link>
                <button className=" ml-3 bg-red-500 text-white rounded-md mb-2 px-3 my-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            {/* Header Section */}
            <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Manager Dashboard</h2>
              <button
        onClick={() => setShowModal(true)}
        className="text-2xl border border-white rounded-md p-2 font-bold hover:scale-105 transition-transform"
      >
        Add Room
      </button>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-black p-6 rounded-md shadow-lg w-96">
            
            
            {/* AddRooms Component */}
            <AddRooms />

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-around bg-orange-100 rounded p-4">
              {/* Room Navigation */}
              <button
                onClick={() => setActiveTab("ViewRooms")}
                className={`text-xl font-bold p-2 ${activeTab === "ViewRooms"
                    ? "bg-primary1 text-white rounded-md"
                    : "text-gray-700"
                  }`}
              >
                View Rooms
              </button>
              {/* Reservation Navigation */}
              <button
                onClick={() => setActiveTab("AllReservations")}
                className={`text-xl font-bold p-2 ${activeTab === "AllReservations"
                    ? "bg-primary1 text-white rounded-md "
                    : "text-gray-700"
                  }`}
              >
                All Reservations
              </button>
              {/* Menu Navigation */}
              <button
                onClick={() => setActiveTab("ViewMenu")}
                className={`text-xl font-bold p-2 ${activeTab === "ViewMenu"
                    ? "bg-primary1 text-white rounded-md"
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
             <div className="flex items-center justify-between w-full p-3">
              <div className='flex '>
                <img src={logo} alt="Logo" style={{ width: "70px" }} />
                <span className=" pt-5 text-xl font-semibold text-primary1">
                  LuxeStay
                </span>
              </div>
              <div className="flex ">
                <Link to={"/"}>
                  <div className="p-2 m-3 border border-solid rounded-md border-primary1 ">
                    <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
                  </div>
                </Link>
                <button className=" ml-3 bg-red-500 text-white rounded-md mb-2 px-3 my-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            {/* Header Section */}
            <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Receptionist Dashboard</h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-around bg-orange-100 rounded p-4">
              <button
                onClick={() => setActiveTabrep("AllReservations")}
                className={`text-xl font-bold p-2 ${activeTabrep === "AllReservations"
                    ? "bg-primary1 text-white rounded-md"
                    : "text-gray-700"
                  }`}
              >
                All Reservations
              </button>
              <button
                onClick={() => setActiveTabrep("ViewRooms")}
                className={`text-xl font-bold p-2 ${activeTabrep === "ViewRooms"
                    ? "bg-primary1 text-white rounded-md"
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
             <div className="flex items-center justify-between w-full p-3">
              <div className='flex '>
                <img src={logo} alt="Logo" style={{ width: "70px" }} />
                <span className=" pt-5 text-xl font-semibold text-primary1">
                  LuxeStay
                </span>
              </div>
              <div className="flex ">
                <Link to={"/"}>
                  <div className="p-2 m-3 border border-solid rounded-md border-primary1 ">
                    <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
                  </div>
                </Link>
                <button className=" ml-3 bg-red-500 text-white rounded-md mb-2 px-3 my-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold">Housekeeping Dashboard</h2>
            </div>
          </div>
        );

      /* Chef Dashboard */
      case "chef":
        return (
          <div>
             <div className="flex items-center justify-between w-full p-3">
              <div className='flex '>
                <img src={logo} alt="Logo" style={{ width: "70px" }} />
                <span className=" pt-5 text-xl font-semibold text-primary1">
                  LuxeStay
                </span>
              </div>
              <div className="flex ">
                <Link to={"/"}>
                  <div className="p-2 m-3 border border-solid rounded-md border-primary1 ">
                    <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
                  </div>
                </Link>
                <button className=" ml-3 bg-red-500 text-white rounded-md mb-2 px-3 my-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            {/* Header Section */}
            <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
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
