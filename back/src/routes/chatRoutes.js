import express from 'express';
import chatController from '../controllers/chat/chatController.js';

const chatRouter = express.Router();
chatRouter.get('/', chatController.createChat);

// CREATE ROUTER
const chatRoutes = chatRouter;

export default chatRoutes;