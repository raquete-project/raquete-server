import locationController from '@interfaces/controllers/locationController';
import { Router } from 'express';
import matchRouter from './matchRouter';

const locationRouter = Router({ mergeParams: true });

locationRouter.use('/:locationId/matches', matchRouter);
locationRouter
    .route('/')
    .get(locationController.findAll)
    .post(locationController.create);

export default locationRouter;
