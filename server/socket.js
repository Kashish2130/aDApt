import { Server } from 'socket.io';
import GroupChatMessage from './models/groupChatMessageModel.js';

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    // Join a room for group chat
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    // Receive and broadcast messages
    socket.on('sendMessage', async ({ roomId, message, user }) => {
      if (!user || !user._id) {
        // Optionally emit an error to the sender
        return;
      }
      // Save message to DB
      const newMsg = new GroupChatMessage({
        roomId,
        message,
        sender: user._id,
      });
      await newMsg.save();
      await newMsg.populate('sender', 'fullname _id');
      io.to(roomId).emit('receiveMessage', {
        id: newMsg._id,
        userId: newMsg.sender._id,
        fullname: newMsg.sender.fullname,
        text: newMsg.message,
        timestamp: newMsg.timestamp,
      });
    });
  });
}
