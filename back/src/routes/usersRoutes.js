import express from 'express';
import usersController from '../controllers/users/usersController.js';
import userAuth from '../middlewares/userAuth.js';
import { logIn } from '../controllers/users/login.js';
import { registerUser } from '../controllers/users/register.js';

const userRouter = express.Router();

// CREATE ROUTES

// Routes for Users
userRouter.post('/create', usersController.createUser);
userRouter.get('/', userAuth, usersController.getAllUsers);
userRouter.get('/:id', userAuth, usersController.getUserById);
userRouter.put('/:id', userAuth, usersController.updateUser);
userRouter.post('/register', registerUser);
userRouter.post('/login', logIn);
userRouter.delete('/:id', usersController.deleteUser);

// CREATE ROUTER
const usersRoutes = userRouter;

export default usersRoutes;
