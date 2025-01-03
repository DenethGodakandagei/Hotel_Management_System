import React, { useState } from "react";
import axios from "axios";
const ManageRooms = () => {
    const [formData, setFormData] = useState({
      roomNumber: "",
      roomType: "",
      pricePerNight: "",
      amenities: [],
      capacity: "",
      images: [],
      description: "",
    });
  
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0); // State to track progress
    const [isUploading, setIsUploading] = useState(false); // State to track uploading status
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "images") {
        const selectedFiles = e.target.files;
        if (selectedFiles.length + formData.images.length <= 5) {
          setFormData({
            ...formData,
            [name]: [...formData.images, ...selectedFiles],
          });
        } else {
          alert("You can upload a maximum of 5 images.");
        }
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
      setIsUploading(true); // Start upload
      setProgress(0); 
  
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          Array.from(formData[key]).forEach((image) => {
            data.append("images", image);
          });
        } else {
          data.append(key, formData[key]);
        }
      });
  
      try {
        const response = await axios.post("http://localhost:5000/api/room/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted); // Update progress
          },
        });
  
        setMessage("Room added successfully!");
        setFormData({
          roomNumber: "",
          roomType: "",
          pricePerNight: "",
          amenities: [],
          capacity: "",
          images: [],
          description: "",
        });
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Error adding room";
        setMessage(errorMessage);
      } finally {
        setIsUploading(false); // End upload
      }
    };
  
    const renderImagePreviews = () => {
      const previews = Array.from(formData.images).map((file, index) => (
        <div key={index} className="relative inline-block mr-2 mb-2">
          <img
            src={URL.createObjectURL(file)}
            alt={`Image preview ${index + 1}`}
            className="w-20 h-20 object-cover rounded"
          />
          <button
            type="button"
            className="absolute top-0 right-0 text-white bg-red-600 p-1 rounded-full"
            onClick={() => removeImage(index)}
          >
            X
          </button>
        </div>
      ));
      return previews;
    };
  
    const removeImage = (index) => {
      const updatedImages = Array.from(formData.images);
      updatedImages.splice(index, 1);
      setFormData({ ...formData, images: updatedImages });
    };
  return (
    <div className=" mx-auto p-6 bg-white rounded shadow">
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
            {["Wi-Fi", "Air Conditioning", "TV", "Mini Bar", "Balcony", "Pool Access", "Breakfast Included"].map(
              (amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    value={amenity}
                    onChange={handleAmenitiesChange}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              )
            )}
          </div>
        </div>

        {/* Image upload section */}
        <div>
          <label className="block font-medium mb-1">Room Images (Upload up to 5 images)</label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            accept="image/*"
            multiple
          />
          {formData.images.length > 0 && (
            <div className="mt-2">
              <h3 className="font-medium">Image Previews:</h3>
              <div className="flex flex-wrap">{renderImagePreviews()}</div>
            </div>
          )}
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
          className={`px-4 py-2 text-white rounded ${
            isUploading ? "bg-gray-400" : "bg-orange-400 hover:bg-orange-500"
          }`}
          disabled={isUploading} // Disable button during upload
        >
          {isUploading ? "Uploading..." : "Add Room"}
        </button>
      </form>

      {progress > 0 && isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className="bg-green-500 h-4 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">{progress}%</p>
        </div>
      )}

      {message && (
        <div className="mt-4 text-center text-green-600">{message}</div>
      )}
    </div>
  );
};

export default ManageRooms;
