import express from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.get("/", protectedRoutes, getUsers);
router.get("/:id", protectedRoutes, getUser);

export default router;
