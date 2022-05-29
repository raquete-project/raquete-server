import { Request, Response } from 'express';

import matchRepository from '@infrastructure/repositories/matchRepository';
import findAllMatches from '@application/use_case/match/findAllMatches';
import createMatch from '@application/use_case/match/createMatch';

export default {
    findAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const resultMatches = await findAllMatches(matchRepository);

            return res.status(200).json({
                status: 'success',
                message: 'All matches returned successfully',
                payload: resultMatches,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while find all matches',
                payload: [err],
            });
        }
    },

    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { locationId } = req.params;
            const { date, result, pairId1, pairId2 } = req.body;

            const resultLocation = await createMatch(
                matchRepository,
                date,
                result,
                pairId1,
                pairId2,
                locationId
            );

            if (resultLocation.status === 'error') {
                res.status(409).json({
                    status: 'error',
                    message: 'Duplicate match',
                    payload: null,
                });
            }

            return res.status(201).json({
                status: 'success',
                message: 'New match created',
                payload: resultLocation,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while creating new match',
                payload: [err],
            });
        }
    },
};
