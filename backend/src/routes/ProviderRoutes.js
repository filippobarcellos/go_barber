import { Router } from 'express';

import ProviderController from '../app/controllers/ProviderController';

const routes = Router();

routes.get('/', ProviderController.getProviders);

export default routes;
