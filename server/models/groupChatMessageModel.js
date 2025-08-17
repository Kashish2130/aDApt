// models/groupChatMessage.model.js
import mongoose from 'mongoose';

const groupChatMessageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String, // This will be something like `${categoryType}-${itemId}`
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const GroupChatMessage = mongoose.model('GroupChatMessage', groupChatMessageSchema);
export default GroupChatMessage;
