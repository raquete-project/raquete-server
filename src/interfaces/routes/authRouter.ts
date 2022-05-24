import { Router } from 'express';
import AuthController from '@interfaces/controllers/authController';

const authRouter = Router();

authRouter.route('/login').get(AuthController.login);
authRouter.route('/logout').get(AuthController.logout);

export default authRouter;
