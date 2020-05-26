import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

const routes = Router();

routes.post('/', SessionController.createSession);

export default routes;
