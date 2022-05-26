import { Router } from 'express';
import { Request, Response } from 'express';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import pairRouter from './routes/pairRouter';
import authMiddleware from '@infrastructure/middlewares/authMiddleware';
import userController from '@interfaces/controllers/userController';
import locationRouter from './routes/locationRouter';

const router = Router();

router.use('/api/auth', authRouter);
router.post('/api/users', userController.create);
router.use('/api/users', authMiddleware, userRouter);
router.use('/api/pairs', authMiddleware, pairRouter);
router.use('/api/locations', authMiddleware, locationRouter);

// Request made to non-existent resource
router.use((req: Request, res: Response) => {
    res.status(404).end();
});

export default router;
