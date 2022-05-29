import { Request, Response } from 'express';

import pairRepository from '@infrastructure/repositories/pairRepository';
import findAllPairs from '@application/use_case/pair/findAllPairs';
import createPair from '@application/use_case/pair/createPair';
import joinPair from '@application/use_case/pair/joinPair';

export default {
    findAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const resultPairs = await findAllPairs(pairRepository);

            return res.status(200).json({
                status: 'success',
                message: 'All pairs returned successfully',
                payload: resultPairs,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while find all pairs',
                payload: [err],
            });
        }
    },

    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, score, userId1 } = req.body;

            const resultPair = await createPair(
                pairRepository,
                name,
                score,
                userId1
            );

            if (resultPair.status === 'error') {
                res.status(409).json({
                    status: 'error',
                    message: 'Duplicate pair',
                    payload: null,
                });
            }

            return res.status(201).json({
                status: 'success',
                message: 'New pair created',
                payload: resultPair,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while creating new pair',
                payload: [err],
            });
        }
    },

    joinPair: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId, pairId } = req.params;

            const result = await joinPair(pairRepository, pairId, userId);

            return res.status(201).json({
                status: 'success',
                message: 'User joined pair',
                payload: result,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while user joined pair',
                payload: [err],
            });
        }
    },

    deletePair: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { pairId } = req.params;

            const result = await pairRepository.deletePair(pairId);

            return res.status(200).json({
                status: 'success',
                message: 'Pair deleted',
                payload: result,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while deleting pair',
                payload: [err],
            });
        }
    },
};
