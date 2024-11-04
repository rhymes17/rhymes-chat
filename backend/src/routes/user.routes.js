import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.get("/", protectedRoutes, getUsers);

export default router;
