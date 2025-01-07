import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Payment from "./Admin/Payment/Payment";

// Set up moment localizer for calendar
const localizer = momentLocalizer(moment);

const Roominfo = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { room } = location.state;
  const [events, setEvents] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
  }, []);

  useEffect(() => {
    // Fetch reservation data from the backend
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations");
        const data = response.data;

        // Filter reservations for the current room
        const roomReservations = data
          .filter((reservation) => reservation.roomId._id === room._id)
          .map((reservation) => ({
            title: `Booked`,
            start: new Date(reservation.checkInDate),
            end: new Date(reservation.checkOutDate),
            status: reservation.status,
          }));

        setEvents(roomReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [room._id]);

  const currentDate = new Date(); // Get current date

  const dayPropGetter = (date) => {
    if (date < currentDate) {
      return { className: "bg-gray-200 cursor-not-allowed hidden" }; // Disable past dates
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? room.images.length - 1 : prevIndex - 1));
  };

  // Function to handle reservation booking
  const handleBookNow = async () => {
    if (!user) {
      alert("Please log in to make a reservation.");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    // Check for date overlap with existing reservations
    const isOverlapping = events.some((event) => {
      const existingCheckIn = new Date(event.start);
      const existingCheckOut = new Date(event.end);

      return (
        (checkInDate >= existingCheckIn && checkInDate < existingCheckOut) ||
        (checkOutDate > existingCheckIn && checkOutDate <= existingCheckOut) ||
        (checkInDate <= existingCheckIn && checkOutDate >= existingCheckOut)
      );
    });

    if (isOverlapping) {
      alert("Selected dates are reserved");
      return;
    }

    // Prepare reservation data
    const reservationData = {
      email: user.email,
      roomId: room._id,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      amount: totalAmount,
    };

    // Open the payment modal
    setIsPaymentModalOpen(true);
  };

  // Handle payment success
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const reservationData = {
        email: user.email,
        roomId: room._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        amount: totalAmount,
      };

      // Send reservation data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/reservations",
        reservationData
      );

      if (response.status === 201) {
        alert("Reservation created successfully!");
        // Update events after successful booking
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            title: "Booked",
            start: new Date(reservationData.checkInDate),
            end: new Date(reservationData.checkOutDate),
            status: "Booked",
          },
        ]);
        setIsPaymentModalOpen(false); // Close the payment modal after success
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error creating reservation. Please try again.");
    }
  };

  // Calculate total amount based on selected dates
  const calculateTotalAmount = () => {
    if (!checkInDate || !checkOutDate) {
      setTotalAmount(0);
      return;
    }

    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfNights = timeDifference / (1000 * 3600 * 24);

    setTotalAmount(numberOfNights > 0 ? numberOfNights * room.pricePerNight : 0);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [checkInDate, checkOutDate]);

  // Modal to show payment
  const PaymentModal = ({ isOpen, onClose, reservationData, onPaymentSuccess }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
          onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
        >
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={onClose}
          >
            X
          </button>
          <Payment
            reservationData={reservationData}
            onPaymentSuccess={onPaymentSuccess}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen min-h-screen items-center justify-center px-6 py-12">
      <div className="w-3/4 mx-auto flex flex-col items-center justify-center">
        {/* Image Carousel */}
        <div className="relative group w-full">
          <img
            className="w-full h-80 md:h-96 object-cover rounded-lg transition-all duration-500 transform hover:scale-105"
            src={room.images[currentImageIndex]}
            alt={room.roomType}
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              className="bg-black text-white rounded-full p-2 opacity-50 hover:opacity-100 transition-all duration-300"
              onClick={handlePrevImage}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button
              className="bg-black text-white rounded-full p-2 opacity-50 hover:opacity-100 transition-all duration-300"
              onClick={handleNextImage}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {room.images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 transform ${index === currentImageIndex ? "scale-105 border-4 border-blue-500" : "hover:scale-110"}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img className="w-full h-full object-cover" src={image} alt={`Room Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl w-full bg-white rounded-lg shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 mx-auto items-center justify-center">
        {/* Room Details */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full bg-gray-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{room.roomType} Room</h3>
            <p className="text-gray-600">{room.description}</p>
            <p className="text-gray-600 mt-2">Price per night: ${room.pricePerNight}</p>
          </div>

          {/* Date Selection */}
          <div className="mt-6 w-full">
            <h4 className="text-xl font-medium">Select Check-in and Check-out Dates</h4>
            <div className="flex gap-4 mt-2">
              <div className="w-1/2">
                <label className="block text-gray-600 mb-1">Check-in Date</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-600 mb-1">Check-out Date</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={checkInDate || new Date()}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-6">
            <h4 className="text-xl font-medium">Total Amount: ${totalAmount}</h4>
          </div>

          {/* Book Now Button */}
          <div className="mt-6">
            <button
              onClick={handleBookNow}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="w-full">
          <h4 className="text-xl font-medium text-center mb-4">Room Availability</h4>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "400px" }}
            dayPropGetter={dayPropGetter}
          />
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        reservationData={{
          email: user?.email,
          roomId: room._id,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          amount: totalAmount,
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Roominfo;
