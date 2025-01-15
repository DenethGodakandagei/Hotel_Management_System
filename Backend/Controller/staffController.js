import Staff from '../Model/Staff.js';
import User from '../Model/User.js';

// Create a new staff member
export const createStaff = async (req, res) => {
  try {
    const { userId, salary, role } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already a staff member
    const existingStaff = await Staff.findOne({ userId });
    if (existingStaff) {
      return res.status(400).json({ message: 'User is already a staff member' });
    }

    // Create the staff member
    const staff = new Staff({ userId, salary, role });
    await staff.save();

    res.status(201).json({ message: 'Staff member created successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all staff members
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate('userId', 'name email');
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single staff member by ID
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id).populate('userId', 'name email');

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a staff member by userId
export const getStaffByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find staff by userId
      const staff = await Staff.findOne({ userId }).populate('userId', 'name email');
  
      if (!staff) {
        return res.status(404).json({ message: 'Staff member not found' });
      }
  
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

// Update a staff member
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { salary, role } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      id,
      { salary, role, updatedAt: Date.now() },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.status(200).json({ message: 'Staff member updated successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a staff member
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
