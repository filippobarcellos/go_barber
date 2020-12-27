import { Router } from 'express';
import multer from 'multer';

import UserController from '../app/controllers/UserController';

import uploadConfig from '../config/upload';
import auth from '../app/middlewares/auth';

const upload = multer(uploadConfig);

const routes = Router();

routes.post('/', UserController.store);
routes.patch('/avatar', auth, upload.single('avatar'), UserController.update);

export default routes;
