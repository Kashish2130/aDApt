import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt";

//you have made the authcontroller for signup now make routes and check through postman

//signup
export const createUser = async (req, res) => {
    try {
        const { fullname, email, password, adminkey } = req.body;

        // Hash the password
        const hash = hashSync(password, 10);

        // Generate JWT token
        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1h" });

        // Create a new user object with hashed password and token
        const newUser = new User({
            fullname,
            email,
            password: hash,
            adminkey,
            token,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user details in case you want to display it on the frontend somewhere(excluding sensitive information like the hashed password)
        res.status(200).json({
            user: {
                id: savedUser._id,
                fullname: savedUser.fullname,
                email: savedUser.email,
            },
            token,
        });
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password, adminkey } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate admin key (if provided)
        if (adminkey && user.adminkey !== adminkey) {
            return res.status(400).json({ message: 'Invalid admin key' });
        }

        // Generate a token
        const token = jwt.sign(
            { email, fullname: user.fullname },
            process.env.SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
