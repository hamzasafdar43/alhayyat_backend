const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

// Create a new user
const registered = async (req, res) => {
    const { name, email, password , phoneNumber } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phoneNumber , password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' , user:user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// login user 

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
      }
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      if (!process?.env?.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in .env file');
      }
  
      const token = await jwt.sign({ id: user._id }, process?.env?.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: "Error fetching users" });
    }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Error fetching user" });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
   try {
        const { name, email, phoneNumber } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phoneNumber },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Error updating user", error: error.message });
    }
};


// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user" });
    }
};

// Export the controller functions
module.exports = {
    registered,
    login,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
