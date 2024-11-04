import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// @desc    Signup a User
// @route   POST /auth/signup
// @access  PUBLIC
export const registerUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    // Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: `https://avatar.iran.liara.run/username?username=${username}`,
    });

    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Could not register the user", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Login a User
// @route   POST /auth/login
// @access  PUBLIC
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Input fields cannot be empty" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found, Kindly signup" });
    }

    // Decode the password and verify
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (verifyPassword) {
      generateTokenAndSetCookie(user._id, res);

      return res.status(200).json({
        message: "User loggedin succcessfully.",
        user: {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
          gender: user.gender,
        },
      });
    } else {
      return res.status(400).json({
        error: "Incorrect password!",
      });
    }
  } catch (error) {
    console.log("Could not login the user", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Logout a User
// @route   POST /auth/logout
// @access  PRIVATE
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Could not logout the user", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
