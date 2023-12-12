import express from 'express';
import chatController from '../controllers/chat/chatController.js';

const chatRouter = express.Router();
chatRouter.post('/', chatController.createChat);
chatRouter.get('/', chatController.getChat);
// chatRouter.get('/', chatController.getChatById);

// CREATE ROUTER
const chatRoutes = chatRouter;

export default chatRoutes;
