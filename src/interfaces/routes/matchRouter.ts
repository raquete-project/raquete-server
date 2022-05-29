import matchController from '@interfaces/controllers/matchController';
import { Router } from 'express';

const matchRouter = Router({ mergeParams: true });

matchRouter
    .route('/')
    .get(matchController.findAll)
    .post(matchController.create);

export default matchRouter;
