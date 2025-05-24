import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt";

//you have made the authcontroller for signup now make routes and check through postman

//signup
export const createUser = async (req, res) => {
  try {
    const { fullname, email, password, adminkey } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    // Hash the password
    const hash = hashSync(password, 10);

    // Check if the admin key matches
    const isAdmin = adminkey && adminkey === process.env.KEY;

    // Create a new user object with hashed password and token
    const newUser = new User({
      fullname,
      email,
      password: hash,
      isAdmin, // Set isAdmin based on the admin key
    });

    // Generate JWT token
    const token = jwt.sign({ id:newUser._id }, process.env.SECRET, { expiresIn: "10h" });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user details
    res.status(200).json({
      user: {
        id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      },
      token,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password, adminkey } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate admin key (if provided)
    const isAdmin = adminkey && adminkey === process.env.KEY;

    // Generate a token
    const token = jwt.sign({ id:user._id }, process.env.SECRET, { expiresIn: "10h" });

    res.status(200).json({
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAdmin: isAdmin,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
