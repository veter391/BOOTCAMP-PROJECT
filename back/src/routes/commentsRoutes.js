import express from 'express';
import commentsController from '../controllers/comments/commentsController.js';

const commentRouter = express.Router();

// CREATE ROUTES
commentRouter.post('/create', commentsController.addComment);
commentRouter.get('/', commentsController.getAllComments);
commentRouter.get('/:id', commentsController.getCommentsById);
commentRouter.put('/:id', commentsController.updateComment);
commentRouter.delete('/:id', commentsController.deleteComment);

// CREATE ROUTER
const commentRoutes = commentRouter;

<<<<<<< HEAD
export default commentRoutes;
=======
export default commentRoutes;
>>>>>>> fixedBugsBack/jose
