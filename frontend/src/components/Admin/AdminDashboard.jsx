import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DashboardNavigater from "./DashboardNavigater";

const AdminDashboard = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [roomDetails, setRoomDetails] = useState([]);
  const [menuDetails, setMenuDetails] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [roomError, setRoomError] = useState("");
  const [reservationError, setReservationError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [menuError, setMenuError] = useState("");

  useEffect(() => {
    // Fetch rooms data
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/room");
        setTotalRooms(response.data.length); // Assuming the API returns an array of rooms
        setRoomDetails(response.data); // Store room details for display
        setRoomError("");
      } catch (err) {
        setRoomError(err.response?.data?.message || "Failed to fetch room data");
      } finally {
        setLoadingRooms(false);
      }
    };

    // Fetch reservations data
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations");
        setTotalReservations(response.data.length); // Assuming the API returns an array of reservations
        setReservationError("");
      } catch (err) {
        setReservationError(
          err.response?.data?.message || "Failed to fetch reservation data"
        );
      } finally {
        setLoadingReservations(false);
      }
    };

    // Fetch payments data
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payments");
        const total = response.data.reduce((acc, payment) => acc + payment.amount, 0); // Sum of all amounts
        setTotalPayments(total);
        setPaymentError("");
      } catch (err) {
        setPaymentError(
          err.response?.data?.message || "Failed to fetch payment data"
        );
      } finally {
        setLoadingPayments(false);
      }
    };
    // Fetch menu data
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuDetails(response.data); // Store menu details for display
        setMenuError("");
      } catch (err) {
        setMenuError(err.response?.data?.message || "Failed to fetch menu data");
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchRooms();
    fetchReservations();
    fetchPayments();
    fetchMenu();
  }, []);

  return (
    <div className="flex h-screen">
      <DashboardNavigater />
      {/* Main Content */}
      <main className="flex-1 ml-1/5 p-8 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
          <p className="mt-2 text-sm">Here's a summary of your dashboard.</p>
        </div>

        {/* Dashboard Widgets */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Rooms Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 text-lg font-semibold">Total Rooms</h3>
            {loadingRooms ? (
              <p className="text-gray-500 mt-4">Loading...</p>
            ) : roomError ? (
              <p className="text-red-500 mt-4">{roomError}</p>
            ) : (
              <p className="text-4xl font-bold text-orange-600 mt-4">{totalRooms}</p>
            )}
          </div>

          {/* Total Reservations Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 text-lg font-semibold">Reservations</h3>
            {loadingReservations ? (
              <p className="text-gray-500 mt-4">Loading...</p>
            ) : reservationError ? (
              <p className="text-red-500 mt-4">{reservationError}</p>
            ) : (
              <p className="text-4xl font-bold text-orange-600 mt-4">
                {totalReservations}
              </p>
            )}
          </div>

          {/* Total Payments Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-700 text-lg font-semibold">Total Payments</h3>
            {loadingPayments ? (
              <p className="text-gray-500 mt-4">Loading...</p>
            ) : paymentError ? (
              <p className="text-red-500 mt-4">{paymentError}</p>
            ) : (
              <p className="text-4xl font-bold text-orange-600 mt-4">
                ${totalPayments.toFixed(2)}
              </p>
            )}
          </div>

          {/* Rooms Images Widget */}
          <div className="bg-white p-6 rounded-lg col-span-1 md:col-span-2 lg:col-span-2">
            <Link to={'/managerooms'}>
            <h3 className="text-lg font-semibold text-orange-500">Rooms Details</h3>
            {loadingRooms ? (
              <p className="text-gray-500 mt-4">Loading...</p>
            ) : roomError ? (
              <p className="text-red-500 mt-4">{roomError}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                {roomDetails.map((room) => (
                  <div
                    key={room._id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={room.images[0]}
                      alt={room.roomType}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{room.roomType}</h4>
                      <p className="text-gray-600 mt-2">{room.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </Link>
          </div>
          
          {/* Menu Widget */}
          <div className="bg-white p-6 rounded-lg col-span-1 md:col-span-1 lg:col-span-1">
          <Link to={"/managemenu"}>
              <h3 className="text-lg font-semibold text-orange-500">Menu Details</h3>
              {loadingMenu ? (
                <p className="text-gray-500 mt-4">Loading...</p>
              ) : menuError ? (
                <p className="text-red-500 mt-4">{menuError}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
                  {menuDetails.map((menu) => (
                    <div
                      key={menu._id}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={menu.imageUrl[0]}
                        alt={menu.name}
                        className="h-28 w-full object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-800">{menu.name}</h4>
                        
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
