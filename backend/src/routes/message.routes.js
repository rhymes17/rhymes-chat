import express from "express";
import {
  getMessages,
  getMyConversation,
  sendMessage,
} from "../controllers/message.controller.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.get("/", protectedRoutes, getMyConversation);
router.get("/:id", protectedRoutes, getMessages);
router.post("/send/:id", protectedRoutes, sendMessage);

export default router;
