import { Router } from 'express';
import { Request, Response } from 'express';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import pairRouter from './routes/pairRouter';
import authMiddleware from '@infrastructure/middlewares/authMiddleware';
import userController from '@interfaces/controllers/userController';

const router = Router();

router.use('/api/auth', authRouter);
router.post('/api/users', userController.create);
router.use('/api/users', authMiddleware, userRouter);
router.use('/api/pairs', authMiddleware, pairRouter);

// Request made to non-existent resource
router.use((req: Request, res: Response) => {
    res.status(404).end();
});

export default router;
