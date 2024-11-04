import User from "../models/user.model.js";

// @desc    Get users for sidebar
// @route   GET /api/users
// @access  PRIVATE
export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({
      _id: {
        $ne: userId,
      },
    }).select("-password");
    if (!users) {
      return res.status(400).json({ error: "Could not get users" });
    }

    return res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.log("Could not get the users", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
