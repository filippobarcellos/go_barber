import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import AppointmentController from './app/controllers/AppointmentController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailabilityController from './app/controllers/AvailabilityController';

const upload = multer(uploadConfig);
const routes = Router();

// USER ROUTES
routes.post('/users', UserController.store);
routes.put('/users', auth, UserController.update);

// AVATAR ROUTES
routes.patch(
  '/users/avatar',
  auth,
  upload.single('avatar'),
  AvatarController.update,
);

// SESSION ROUTES
routes.post('/sessions', SessionController.store);

routes.use(auth);

// APPOINTMENT ROUTES
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

// PROVIDER ROUTES
routes.get('/providers', ProviderController.index);
routes.get('/providers/:id/availability', AvailabilityController.index);

// SCHEDULE ROUTES
routes.get('/schedule', ScheduleController.index);

// NOTIFICATION ROUTES
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
