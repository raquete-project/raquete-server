import userController from '@interfaces/controllers/userController';
import { Router } from 'express';
import pairRouter from './pairRouter';

const userRouter = Router({ mergeParams: true });

userRouter.use('/:userId/pairs', pairRouter);

userRouter.route('/').get(userController.findAll);

export default userRouter;
