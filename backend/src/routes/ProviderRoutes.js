import { Router } from 'express';

import ProviderController from '../app/controllers/ProviderController';

const routes = Router();

routes.get('/', ProviderController.index);

export default routes;
