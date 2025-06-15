import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../services/api";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  // Fetch all reservations
  const fetchReservations = async () => {
    try {
      //const response = await axios.get("http://localhost:5000/api/reservations");
       const response = await api.get("/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">All Reservations</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-orange-200 bg-white shadow-md rounded-lg">
  <thead className="bg-orange-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Room Number
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Room Type
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Check-In Date
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Check-Out Date
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-orange-200">
    {reservations.length > 0 ? (
      reservations.map((reservation) => (
        <tr key={reservation._id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {reservation.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {reservation.roomId?.roomNumber || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {reservation.roomId?.roomType || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(reservation.checkInDate).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(reservation.checkOutDate).toLocaleDateString()}
          </td>
          <td
            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
              reservation.status === "booked"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {reservation.status.charAt(0).toUpperCase() +
              reservation.status.slice(1)}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan="6"
          className="px-6 py-4 text-center text-sm text-gray-500"
        >
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
