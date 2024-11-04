import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(400).json({ error: "Could not find the user" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Could not authenticate the user" });
  }
};

export default protectedRoutes;
