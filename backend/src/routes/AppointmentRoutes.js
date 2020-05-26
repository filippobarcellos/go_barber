import { Router } from 'express';

import AppointmentController from '../app/controllers/AppointmentController';

const routes = Router();

routes.post('/', AppointmentController.createAppointment);
routes.get('/', AppointmentController.getAppointments);

export default routes;
