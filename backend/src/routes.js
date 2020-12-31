import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import Notification from './app/models/Notification';

const upload = multer(uploadConfig);
const routes = Router();

// USER ROUTES
routes.post('/users', UserController.store);
routes.patch('/avatar', auth, upload.single('avatar'), UserController.update);

// SESSION ROUTES
routes.post('sessions', SessionController.store);

routes.use(auth);

// APPOINTMENT ROUTES
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

// PROVIDER ROUTES
routes.get('/providers', ProviderController.index);

// SCHEDULE ROUTES
routes.get('/schedule', ScheduleController.index);

// NOTIFICATION ROUTES
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', Notification.update);

export default routes;
