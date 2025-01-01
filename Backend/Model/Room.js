import mongoose from 'mongoose';

// Define the schema for rooms
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true }, 
  roomType: { type: String, required: true }, 
  pricePerNight: { type: Number, required: true }, 
  amenities: { 
    type: [String], 
    enum: ['Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Pool Access', 'Breakfast Included'], 
    default: [] 
  }, 
  capacity: { type: Number, required: true }, 
  images: { type: [String], default: [] }, 
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});

// Room model
const Room = mongoose.model('Room', roomSchema);

export default Room;
