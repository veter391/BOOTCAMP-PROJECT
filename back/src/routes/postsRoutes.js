import express from 'express';
import { createPost, getPostsByUser, getAllPosts, updatePost, deletePost } from '../controllers/post/postController.js';

const postRouter = express.Router();

// Routes for Posts
postRouter.post('/create', createPost);
postRouter.get('/:user_id', getPostsByUser);
postRouter.get('/', getAllPosts);
postRouter.put('/user_id/:id', updatePost);
postRouter.delete('/delete/:id', deletePost);

<<<<<<< HEAD
export default postRouter;
=======
export default postRouter;
>>>>>>> fixedBugsBack/jose
