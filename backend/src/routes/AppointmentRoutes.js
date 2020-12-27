import { Router } from 'express';
import auth from '../app/middlewares/auth';
import AppointmentController from '../app/controllers/AppointmentController';

const routes = Router();

routes.post('/', auth, AppointmentController.store);
routes.get('/', AppointmentController.list);

export default routes;
