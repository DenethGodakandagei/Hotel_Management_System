import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import api from "../services/api";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleEdit = () => {
    setEditMode(!editMode); // Toggle edit mode
  };
  const validatePhoneNumber = (phone) => {
    // Sri Lanka phone number pattern
    const sriLankaPhoneRegex = /^(?:\+94|0)(?:7[0125678]\d{7}|[1-9]\d{8})$/;
  
    if (!sriLankaPhoneRegex.test(phone.replace(/\s/g, ""))) {
      setError("Invalid phone number");
    } else {
      setError("");
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
  
    if (name === "phone") {
      if (formattedValue.length > 3 && formattedValue.length <= 7) {
        formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(3)}`;
      } else if (formattedValue.length > 7) {
        formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(3, 7)} ${formattedValue.slice(7)}`;
      }
  
      validatePhoneNumber(formattedValue);
    }
  
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: formattedValue,
    }));
  };

  const handleSave = async () => {
    if (error) {
    
      return;
    }
    try {
      //const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, userData);
      const response = await api.put(`/users/${user.id}`, userData);
      setUserData(response.data.data);
      setEditMode(false); // Exit edit mode after saving
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Unable to update user details. Please try again.");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      setUserData(user);
      setError(""); // Clear any previous errors

      const fetchReservations = async () => {
        try {
         // const response = await axios.get("http://localhost:5000/api/reservations");
         const response = await api.get("/reservations");
          const filteredReservations = response.data.filter(
            (reservation) => reservation.email === user.email
          );
          const reservationsWithRoomDetails = await Promise.all(
            filteredReservations.map(async (reservation) => {
              try {
               // const roomResponse = await axios.get(`http://localhost:5000/api/room/${reservation.roomId._id}`);
                 const roomResponse = await api.get(`/room/${reservation.roomId._id}`);
                return { ...reservation, room: roomResponse.data };
              } catch (err) {
                console.error(`Error fetching room details for roomId ${reservation.roomId}:`, err);
                return { ...reservation, room: null };
              }
            })
          );

          setReservations(reservationsWithRoomDetails);
        } catch (err) {
          console.error("Error fetching reservations:", err);
          setError("Unable to fetch reservations. Please try again later.");
        }
      };

      fetchReservations();
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        //const response = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
         const response = await api.get(`/orders/user/${user.id}`);
        setOrders(response.data);
      } catch (err) {
        setError("Error fetching orders");
      } finally {
       return ;
      }
    };

    if (user.id) {
      fetchOrders();
    }
  }, [user.id]);


  const handleDelete = async (reservationId) => {
    try {
      //await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
       await api.delete(`/reservations/${reservationId}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== reservationId)
      );
    } catch (err) {
      console.error("Error deleting reservation:", err);
      setError("Unable to delete the reservation. Please try again.");
    }
  };
  const handleOrderDelete = async (orderId) => {
    try {
     // await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
       await api.delete(`/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error deleting order", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
          <button className="bg-red-500 text-white rounded-md mb-2 p-1" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={userData?.name || ""}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData?.email || ""}
              readOnly={!editMode}
              disabled={editMode} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={userData?.role || "guest"}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              maxlength="12"
              value={userData?.phone || ""}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <textarea
              name="address"
              value={userData?.address || ""}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onClick={handleEdit}
          >
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>
          {editMode && (
            <button
              className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">Your Reservations</h2>
          {reservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservations.map((reservation) => (
                <div
                  key={reservation._id}
                  className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {reservation.room?.roomType || "Unknown"}
                      <span className="text-orange-500">(Number: {reservation.room?.roomNumber || "N/A"})</span>
                    </h3>
                    <button
                      onClick={() => handleDelete(reservation._id)}
                      className="mt-1 px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                  <p className="text-gray-600">
                    <strong>Check-In:</strong> {new Date(reservation.checkInDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Check-Out:</strong> {new Date(reservation.checkOutDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No reservations found.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-orange-600 mb-6">Your Orders</h2>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {order.items?.map((item) => (
                    <span key={item._id} className="block">
                      {item.menuItemId?.name || "Unknown Item"} (Qty: {item.quantity})
                    </span>
                  ))}
                </h3>
                <button
                  onClick={() => handleOrderDelete(order._id)}
                  className="mt-1 h-8 px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none"
                >
                  <MdDeleteOutline />
                </button>
              </div>
              <p className="text-gray-700">Total Price: ${order.totalAmount}</p>
              <p className="text-gray-600">Status: {order.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Orders found.</p>
      )}
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
