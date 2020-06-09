import { Router } from 'express';

import userRoutes from './UserRoutes';
import authRoutes from './AuthRoutes';
import appointmentRoutes from './AppointmentRoutes';
import providerRoutes from './ProviderRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', authRoutes);
routes.use('/appointments', appointmentRoutes);
routes.use('/providers', providerRoutes);

export default routes;
