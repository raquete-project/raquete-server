import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import userRepository from '@infrastructure/repositories/userRepository';

import checkUserLogin from '@application/use_case/user/checkUserLogin';
import findAllUsers from '@application/use_case/user/findAllUsers';
import createUser from '@application/use_case/user/createUser';

export default {
    findAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const resultUsers = await findAllUsers(userRepository);

            return res.status(200).json({
                status: 'success',
                message: 'All users returned successfully',
                payload: resultUsers,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while find all users',
                payload: [err],
            });
        }
    },

    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, email, password, skillLevel, locationId } = req.body;

            const resultClients = await createUser(
                userRepository,
                name,
                email,
                password,
                skillLevel,
                locationId
            );

            if (resultClients.status === 'error') {
                res.status(409).json({
                    status: 'error',
                    message: 'Duplicate user',
                    payload: null,
                });
            }

            const { userId } = await checkUserLogin(userRepository, {
                email,
                password,
            });

            if (!userId) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Error while login new user',
                    payload: { auth: false, token: null },
                });
            }

            const token = jwt.sign(
                {
                    userId,
                    name,
                    email,
                    skillLevel,
                    locationId,
                },
                process.env.SECRET
            );

            return res.status(201).json({
                status: 'success',
                message: 'New user created',
                payload: [{ auth: true, token, userId }],
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while creating new user',
                payload: [err],
            });
        }
    },
};
