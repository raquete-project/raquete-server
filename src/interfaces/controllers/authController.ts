import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userRepository from '@infrastructure/repositories/userRepository';
import checkUserLogin from '@application/use_case/user/checkUserLogin';

export default {
    login: async (req: Request, res: Response) => {
        const [, hash] = req.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64')
            .toString()
            .split(':');

        try {
            const {
                userId,
                name,
                email: userEmail,
                skillLevel,
                rating,
                address,
                gender,
                birthdate,
            } = await checkUserLogin(userRepository, {
                email,
                password,
            });

            if (!userId) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Error while login',
                    payload: { auth: false, token: null },
                });
            }

            const token = jwt.sign(
                {
                    userId,
                    name,
                    userEmail,
                    skillLevel,
                    rating,
                    address,
                    gender,
                    birthdate,
                },
                process.env.SECRET
            );

            return res.status(200).json({
                status: 'success',
                message: 'User Logged',
                payload: [{ auth: true, token }],
            });
        } catch (err) {
            return res.status(401).json({
                status: 'error',
                message: err.message || 'Error while login',
                payload: [err],
            });
        }
    },
    logout: async (req: Request, res: Response) => {
        return res.status(200).json({
            status: 'success',
            message: 'success logout',
            payload: { auth: false, token: null },
        });
    },
};
