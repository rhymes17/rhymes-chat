import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// @desc    Send a message
// @route   POST /api/message/send/:id
// @access  PRIVATE
export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!newMessage) {
      return res.status(500).json({ error: "Message could not be sent" });
    }

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    res
      .status(201)
      .json({ message: "Message saved successfully", data: message });
  } catch (error) {
    console.log("Could not send the message", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Get messages
// @route   GET /api/message/:id
// @access  PRIVATE
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    let messages = [];

    if (conversation) {
      messages = conversation.messages;
    }

    res.status(200).json({
      message: "Conversation fetched successfully",
      data: messages,
    });
  } catch (error) {
    console.log("Could not send the message", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
