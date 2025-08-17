// controllers/groupChat.controller.js
import GroupChatMessage from '../models/groupChatMessageModel.js';

export const getMessagesForRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await GroupChatMessage.find({ roomId })
      .sort({ createdAt: 1 })
      .populate('sender', 'fullname _id');

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

export const postMessageToRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { message } = req.body;
    const sender = req.user._id; // assuming you use auth middleware

    const newMessage = new GroupChatMessage({
      roomId,
      message,
      sender,
    });
    await newMessage.save();
    // Populate sender before sending response
    await newMessage.populate('sender', 'fullname _id');
    console.log("Message saved successfully:", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message to the database:", error);
    res.status(500).json({ message: "Failed to save message" });
  }
};
