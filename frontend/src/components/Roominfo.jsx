import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

// Set up moment localizer
const localizer = momentLocalizer(moment);

const Roominfo = () => {
    const [user, setUser] = useState(null);
  const location = useLocation();
  const { room } = location.state;
  const [events, setEvents] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch reservation data from the backend
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations");
        const data = response.data;

        // Filter the reservations for the current room and map them into events
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

  // Disable past dates and ensure they are not visible
  const dayPropGetter = (date) => {
    if (date < currentDate) {
      return { className: "bg-gray-200 cursor-not-allowed hidden" }; // Hide past dates
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-screen-xl w-full bg-white rounded-lg shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left Section: Room Images and Details */}
        <div className="flex flex-col items-center space-y-6">
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
                className={`cursor-pointer w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 transform ${
                  index === currentImageIndex ? "scale-105 border-4 border-blue-500" : "hover:scale-110"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={`Room Image ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Room Details */}
          <div className="w-full bg-gray-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{room.roomType} Room</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {room.description || "No description available."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-800">Price:</span>
                <span className="text-2xl font-bold text-orange-500">${room.pricePerNight} / night</span>
              </div>

              {/* Capacity */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-800">Capacity:</span>
                <span className="text-lg text-gray-600">{room.capacity} guests</span>
              </div>

              {/* Amenities */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800">Amenities:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {room.amenities.length > 0 ? (
                    room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                      >
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No amenities available.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between items-center space-x-6">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium px-6 py-3 rounded-lg transition-all duration-200 ease-in-out">
                Back to Rooms
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Reservation Calendar */}
        <div className="flex flex-col space-y-6">
          <div className="w-full p-2 rounded-lg shadow-lg bg-orange-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Booked Dates:</h3>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 300 }}
              min={currentDate} // Disable past dates
              dayPropGetter={dayPropGetter} // Hide past dates visually
              onSelectEvent={(event) => alert(`Reservation: ${event.title}`)} // Just show the title on click
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.status === "Booked" ? "#ff4d4d" : "#4caf50",
                  color: "white",
                  borderRadius: "5px",
                  padding: "5px",
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roominfo;
