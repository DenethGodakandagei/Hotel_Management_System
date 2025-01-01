import Room from '../Model/Room.js';

// Add a new room
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, pricePerNight, amenities, capacity, description, images } = req.body;

    const newRoom = new Room({
      roomNumber,
      roomType,
      pricePerNight,
      amenities,
      capacity,
      description,
      images,
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error adding room', error });
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
    const { roomNumber, roomType, pricePerNight, amenities, capacity, description, images } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { roomNumber, roomType, pricePerNight, amenities, capacity, description, images },
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
