import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch rooms data from the API
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/room/");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle Delete Room
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/room/${id}`);
      fetchRooms(); // Re-fetch rooms after deletion
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  // Open modal with room data for editing
  const handleEdit = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // Handle Room Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/room/${selectedRoom._id}`, selectedRoom);
      fetchRooms(); // Re-fetch rooms after updating
      closeModal();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Room Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-orange-200 text-gray-700">
              <th className="p-4">Room Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Image</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-b">
                <td className="p-4">{room.roomNumber}</td>
                <td className="p-4">${room.pricePerNight}</td>
                <td className="p-4">
                  {room.images.length > 0 ? (
                    <img src={room.images[0]} alt="Room" className="w-16 h-16 object-cover" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="p-4 flex space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(room)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Room */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-3/4 max-w-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-500 m-2 hover:text-gray-800 text-sm font-semibold px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
              >
                Close
              </button>
            </div>

            {/* Edit Room Form */}
            <h3 className="text-xl font-semibold mb-4">Edit Room</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={selectedRoom.roomNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price Per Night</label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={selectedRoom.pricePerNight}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Room Type</label>
                <input
                  type="text"
                  name="roomType"
                  value={selectedRoom.roomType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRooms;