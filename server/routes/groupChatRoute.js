// routes/groupChat.routes.js
import express from 'express';
import {
  getMessagesForRoom,
  postMessageToRoom,
} from '../controllers/groupChatController.js';

const router = express.Router();

router.get('/:roomId/messages', getMessagesForRoom);
router.post('/:roomId/messages', postMessageToRoom);

export default router;
