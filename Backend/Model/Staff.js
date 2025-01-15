import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  salary: { type: Number, required: true },
  role: {
    type: String,
    enum: ['manager', 'receptionist', 'housekeeping', 'chef'], 
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Staff', StaffSchema);
