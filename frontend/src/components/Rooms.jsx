import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch rooms from the backend
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/room/");
      setRooms(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch rooms. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // Navigate to RoomInfo with room data
  const handleBookNow = (room) => {
    navigate(`/${room._id}`, { state: { room } });
  };

  return (
    <div>
      <div className="flex w-screen min-h-screen bg-gray-50" id="room">
        <div className="container mx-auto px-4">
          <div className="w-full text-center mb-8 mt-4">
            <h1 className="text-4xl font-extrabold text-orange-500">
              Explore Our Rooms
            </h1>
            <p className="text-gray-600 mt-2">
              Choose from a variety of luxurious and budget-friendly options.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                {room.images.length > 0 ? (
                  <img
                    className="w-full h-48 object-cover"
                    src={room.images[0]}
                    alt={`${room.roomType} Image`}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-800">{room.roomType}</h5>
                  <div className="mt-2 text-gray-600 text-sm">
                    {room.description || "No description available."}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-lg font-semibold text-orange-500">
                      ${room.pricePerNight} / night
                    </div>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Capacity: {room.capacity} guests
                  </span>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
