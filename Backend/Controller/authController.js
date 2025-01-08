import User from '../Model/User.js';
import { generateToken } from '../Utils/authUtils.js';
import bcrypt from 'bcryptjs';

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Create a new user instance
  const newUser = new User({
    name,
    email,
    password,  // No need to hash here again since it's handled in UserSchema
    role: role || 'guest',  // Default to 'guest' if no role is provided
  });

  try {
    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken(savedUser._id, savedUser.role);

    // Respond with the new user and token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  // Compare the password
  console.log(`Comparing password: ${password} with stored password hash: ${user.password}`);
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  // Generate a JWT token
  const token = generateToken(user._id, user.role);

  // Set the token as a secure cookie
  res.cookie("token", token, {
    httpOnly: true,  // Helps prevent XSS attacks
    maxAge: 3600000, // 1 hour expiration time for better session management
    secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
    sameSite: 'Strict', // Prevent CSRF attacks by ensuring cookies are sent only with same-site requests
  });

  // Respond with the token and user details
  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};


 const getUser = (req, res) => {
  const user = req.user;
  res.json({ user });
};

export { registerUser, loginUser, getUser };
