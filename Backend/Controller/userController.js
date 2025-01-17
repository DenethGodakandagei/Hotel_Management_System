import User from '../Model/User.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude the password from the response
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message,
    });
  }
};

// Edit user
export const editUser = async (req, res) => {
  const { id } = req.params; 
  const updateData = req.body; 

  // Exclude password updates directly
  if (updateData.password) {
    return res.status(400).json({
      success: false,
      message: 'Password updates are not allowed here.',
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() }, // Include `updatedAt` field update
      { new: true, runValidators: true } // Return the updated document and validate changes
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;  // Get user ID from the request params
  
    try {
      // Find and delete the user by ID
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: deletedUser,  // Send the deleted user data as a confirmation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error.message,
      });
    }
  };