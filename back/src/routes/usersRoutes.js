import express from 'express';
import usersController from '../controllers/users/usersController.js';


const userRouter = express.Router();

// CREATE ROUTES

//Routes for Users
userRouter.post('/create', usersController.createUser);
userRouter.get('/', usersController.getAllUsers);
userRouter.get('/:id', usersController.getUserById);
userRouter.put('/:id', usersController.updateUser);
userRouter.delete('/:id', usersController.deleteUser);

// CREATE ROUTER
const usersRoutes = userRouter;

export default usersRoutes;
