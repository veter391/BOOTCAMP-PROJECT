import express from 'express';
import usersController from '../controllers/usersController.js';
import userQueries from '../config/queries/usersQueries.js';

const userRouter = express.Router();

userRouter.post('/create', usersController.createUser);
userRouter.get('/', usersController.getAllUsers);
userRouter.get('/:id', usersController.getUserById);
userRouter.put('/:id', usersController.updateUser);
userRouter.delete('/:id', usersController.deleteUser);

export default { usersRoutes };