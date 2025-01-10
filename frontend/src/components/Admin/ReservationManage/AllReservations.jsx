import React, { useState, useEffect } from "react";
import axios from "axios";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  // Fetch all reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">All Reservations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-orange-400 rounded-lg text-white">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Room Number</th>
              <th className="py-3 px-6 text-left">Room Type</th>
              <th className="py-3 px-6 text-left">Check-In Date</th>
              <th className="py-3 px-6 text-left">Check-Out Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr key={reservation._id} className="border-b hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-6">{reservation.email}</td>
                  <td className="py-3 px-6">
                    {reservation.roomId?.roomNumber || "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    {reservation.roomId?.roomType || "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(reservation.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(reservation.checkOutDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      reservation.status === "booked"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReservations;
