import React, { useState } from "react";
import axios from "axios";

const ManageRooms = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    amenities: [],
    capacity: "",
    images: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormData({ ...formData, [name]: value.split(",").map((url) => url.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const updatedAmenities = checked
      ? [...formData.amenities, value]
      : formData.amenities.filter((amenity) => amenity !== value);
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/room/add", formData);
      setMessage(response.data.message || "Room added successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Error adding room");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Room</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Room Type</label>
          <input
            type="text"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Price Per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Amenities</label>
          <div className="space-y-2">
            {[
              "Wi-Fi",
              "Air Conditioning",
              "TV",
              "Mini Bar",
              "Balcony",
              "Pool Access",
              "Breakfast Included",
            ].map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  value={amenity}
                  onChange={handleAmenitiesChange}
                  className="mr-2"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Images (comma-separated URLs)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
        >
          Add Room
        </button>
      </form>
      {message && (
        <p
          className={`mb-4 ${
            message.toLowerCase().includes("error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ManageRooms;
