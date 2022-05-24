import pairController from '@interfaces/controllers/pairController';
import { Router } from 'express';

const pairRouter = Router({ mergeParams: true });

pairRouter.route('/').get(pairController.findAll).post(pairController.create);

pairRouter.route('/:pairId').post(pairController.joinPair);

export default pairRouter;
