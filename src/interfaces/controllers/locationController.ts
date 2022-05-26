import { Request, Response } from 'express';

import locationRepository from '@infrastructure/repositories/locationRepository';
import findAllLocations from '@application/use_case/location/findAllLocations';
import createLocation from '@application/use_case/location/createLocation';

export default {
    findAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const resultLocations = await findAllLocations(locationRepository);

            return res.status(200).json({
                status: 'success',
                message: 'All locations returned successfully',
                payload: resultLocations,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while find all locations',
                payload: [err],
            });
        }
    },

    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { address } = req.body;

            const resultLocation = await createLocation(
                locationRepository,
                address
            );

            if (resultLocation.status === 'error') {
                res.status(409).json({
                    status: 'error',
                    message: 'Duplicate location',
                    payload: null,
                });
            }

            return res.status(201).json({
                status: 'success',
                message: 'New location created',
                payload: resultLocation,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message || 'Error while creating new location',
                payload: [err],
            });
        }
    },
};
