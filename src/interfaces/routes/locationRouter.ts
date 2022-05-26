import locationController from '@interfaces/controllers/locationController';
import { Router } from 'express';

const locationRouter = Router({ mergeParams: true });

locationRouter
    .route('/')
    .get(locationController.findAll)
    .post(locationController.create);

export default locationRouter;
