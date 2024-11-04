import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Register a user
router.post("/signup", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout a user
router.post("/logout", logoutUser);

export default router;
