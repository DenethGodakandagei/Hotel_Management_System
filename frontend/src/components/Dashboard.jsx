import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
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
  
      // Fetch reservations for the logged-in user
      const fetchReservations = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/reservations");
          const filteredReservations = response.data.filter(
            (reservation) => reservation.email === user.email
          );
          // Fetch room details for each reservation
          const reservationsWithRoomDetails = await Promise.all(
            filteredReservations.map(async (reservation) => {
              try {
                const roomResponse = await axios.get(`http://localhost:5000/api/room/${reservation.roomId._id}`);
                return { ...reservation, room: roomResponse.data }; // Add room details to the reservation
              } catch (err) {
                console.error(`Error fetching room details for roomId ${reservation.roomId}:`, err);
                return { ...reservation, room: null }; // Handle missing room details gracefully
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

  // Function to delete a reservation
  const handleDelete = async (reservationId) => {
    try {
      console.log(`Sending DELETE request for reservation ID: ${reservationId}`); // Log the ID
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== reservationId)
      );
    } catch (err) {
      console.error("Error deleting reservation:", err);
      setError("Unable to delete the reservation. Please try again.");
    }
  };
  
  
  
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
              <span className="text-orange-500">(Number: {reservation.room?.roomNumber || "N/A"} )</span>
            </h3>
            <button
                      onClick={() => handleDelete(reservation._id)} 
                    className="mt-1 px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none"
                  >
                    <MdDeleteOutline />
                  </button>
            </div>
           
            <p className="text-gray-600">
              <strong>Check-In:</strong>{" "}
              {new Date(reservation.checkInDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Check-Out:</strong>{" "}
              {new Date(reservation.checkOutDate).toLocaleDateString()}
            </p>
            <p
              className={`mt-2 font-semibold ${
                reservation.status === "booked"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Status: {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No reservations found.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default Dashboard;
