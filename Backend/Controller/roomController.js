import cloudinary from '../config/cloudinaryConfig.js';
import Room from '../Model/Room.js';

// Add a new room
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, pricePerNight, amenities, capacity, description } = req.body;
    const amenitiesArray = Array.isArray(amenities) ? amenities : [amenities];

    // Validate amenities 
    const validAmenities = amenitiesArray.filter(amenity => 
      ['Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Pool Access', 'Breakfast Included'].includes(amenity)
    );
    
    // Upload images to Cloudinary
    const imageLinks = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path);
      imageLinks.push(result.secure_url); // Store Cloudinary image URL
    }

    // Create and save the room
    const newRoom = new Room({
      roomNumber,
      roomType,
      pricePerNight,
      amenities: validAmenities,
      capacity,
      description,
      images: imageLinks, 
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("Error in addRoom: ", error);  
    res.status(500).json({ message: 'Error adding room', error: error.message });
  }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};

// Edit room details
export const editRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { roomNumber, roomType, pricePerNight, amenities, capacity, description } = req.body;

    // Validate amenities
    const validAmenities = amenities.filter(amenity => 
      ['Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Pool Access', 'Breakfast Included'].includes(amenity)
    );

    const imageLinks = req.files ? req.files.map(file => file.path) : undefined;

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { 
        roomNumber,
        roomType,
        pricePerNight,
        amenities: validAmenities,  // Update with validated amenities
        capacity,
        description,
        ...(imageLinks && { images: imageLinks }) // Add images if new files are uploaded
      },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error editing room', error });
  }
};

// Get room details by ID
export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room', error });
  }
};

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error });
  }
};
