import React, { useState, useEffect } from "react";
import { Link, useLocation ,useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Payment from "./Payment/Payment.jsx";
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft , FaArrowRight  } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { IoMdHome } from "react-icons/io";
import toast from 'react-hot-toast';
import api from "../services/api";

// Set up moment localizer for calendar
const localizer = momentLocalizer(moment);


const Roominfo = () => {

  const [events, setEvents] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { user } = useAuth();

  const location = useLocation();
  const room = location.state?.room ||  {};
  const { roomId } = useParams();
             
  if (!location.state?.room) {
    console.log(`Fetching room data for ID: ${roomId}`);
   
  }
  useEffect(() => {
    if (room && room._id) {  // Ensure room and room._id are valid before proceeding
      const fetchReservations = async () => {
        try {
         // const response = await axios.get("http://localhost:5000/api/reservations");
          const response = await api.get("/reservations");
          const data = response.data;
          
          // Filter reservations for the current room
          console.log(room._id);
          
          const roomReservations = data
            .filter((reservation) => reservation.roomId && reservation.roomId._id === room._id) // Ensure roomId is not null or undefined
            .map((reservation) => ({
              title: "Booked",
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
    } else {
      console.log("Room object is not defined yet");
    }
  }, [room]);

  const currentDate = new Date();

  const dayPropGetter = (date) => {
    if (date < currentDate) {
      return { className: "bg-gray-200 cursor-not-allowed hidden" }; // Disable past dates
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room?.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? room?.images.length - 1 : prevIndex - 1));
  };

  
  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please log in to make a reservation.");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates.");
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
      toast.error("Selected dates are reserved");
      return;
    }

    // Open the payment modal
    setIsPaymentModalOpen(true);
  };

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
      // const response = await axios.post("http://localhost:5000/api/reservations", reservationData);
       const response = await api.post("/reservations", reservationData);

      if (response.status === 201) {
        toast.success("Reservation created successfully!");
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
        setIsPaymentModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Error creating reservation. Please try again.");
    }
  };

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

  const PaymentModal = ({ isOpen, onClose, reservationData, onPaymentSuccess }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
            X
          </button>
          <Payment reservationData={reservationData} onPaymentSuccess={onPaymentSuccess} />
        </div>
      </div>
    );
  };
  return (
    <div className=" w-screen min-h-screen items-center justify-center px-6 pt-0 py-12">
       <div className=" flex items-center justify-between w-full">
    <div>
      <img src={logo} alt="Logo" style={{ width: "70px" }} />
    </div>
    <Link to={"/"}>
      <div className=" border border-solid rounded-md border-orange-500 ">
        <IoMdHome style={{ fontSize: "30px", color: "orange" }} />
      </div>
    </Link>
  </div>
      <div className="w-3/4 mx-auto flex flex-col items-center justify-center">
        {/* Image Carousel */}
        <div className="relative group w-full">
          <img
            className="w-full h-80 md:h-96 object-cover rounded-lg transition-all duration-500 transform hover:scale-105"
            src={room?.images?.[currentImageIndex] || ''} 
            alt={room?.roomType || 'Room'}
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              className="bg-black text-white rounded-full p-2 opacity-50 hover:opacity-100 transition-all duration-300"
              onClick={handlePrevImage}
            >
            <FaArrowLeft />
            </button>

            <button
              className="bg-black text-white rounded-full p-2 opacity-50 hover:opacity-100 transition-all duration-300"
              onClick={handleNextImage}
            >
             <FaArrowRight />
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
              <img className="w-full h-full object-cover" src={image} alt={`Room Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 p-8 mx-auto items-center justify-center">
  {/* Room Details */}
  <div className="flex flex-col items-start space-y-8">
    <div className="w-full bg-orange-50 p-8 rounded-2xl shadow-lg">
      <h3 className="text-4xl font-semibold text-orange-800 mb-4">{room.roomType} Room</h3>
      <p className="text-gray-700 text-lg mb-4">{room.description}</p>
      <div className="flex gap-4">
        <p className="text-xl text-gray-600">Price per night:</p>
        <p className="text-2xl font-semibold text-orange-600">${room.pricePerNight}</p>
      </div>
    </div>

    {/* Date Selection */}
    <div className="w-full">
      <h4 className="text-2xl font-semibold text-orange-800 mb-6">Select Check-in and Check-out Dates</h4>
      <div className="flex gap-6 mt-4">
        <div className="w-1/2">
          <label className="block text-gray-600 text-lg mb-2">Check-in Date</label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={currentDate}
            dateFormat="yyyy-MM-dd"
            className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-600 text-lg mb-2">Check-out Date</label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate || currentDate}
            dateFormat="yyyy-MM-dd"
            className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
      </div>
    </div>

    {/* Total Amount */}
    <div className="w-full mt-6">
      <h4 className="text-2xl font-semibold text-orange-800 mb-4">Total: <span className="text-xl text-gray-600">${totalAmount}</span></h4>
      <button
        className="w-full bg-orange-600 text-white py-4 rounded-xl shadow-md transition ease-in-out duration-300"
        onClick={handleBookNow}
      >
        Book Now
      </button>
    </div>
  </div>

 
{/* Calendar */}
<div className="w-full bg-white rounded-xl s p-6">
  <h3 className="text-2xl font-semibold text-center mb-4 text-orange-800">Room Availability</h3>
  <div className="flex justify-center">
    <div className="h-full w-full max-w-3xl overflow-hidden rounded-lg border border-gray-300">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          width: '100%',
          padding: 0,
          backgroundColor: '#fff',
        }}
        toolbar={true}
        components={{
          toolbar: (props) => (
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b">
              <div className="flex gap-2">
                <button
                  onClick={() => props.onNavigate('PREV')}
                
                >
                  Back
                </button>
                <button
                  onClick={() => props.onNavigate('TODAY')}
                 
                >
                  Today
                </button>
                <button
                  onClick={() => props.onNavigate('NEXT')}
                 
                >
                  Next
                </button>
              </div>
              <h3 className="font-bold text-gray-900">{props.label}</h3>
              <div className="flex gap-2">
                {['month', 'week'].map((view) => (
                  <button
                    key={view}
                    onClick={() => props.onView(view)}
                    className={`px-3 py-1 rounded `}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ),
        }}
        dayPropGetter={dayPropGetter}
      />
    </div>
  </div>
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
