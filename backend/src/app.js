import express from 'express';
import cors from 'cors';

import routes from './routes';
import connection from './config/database';
import uploadConfig from './config/upload';

require('dotenv').config();

const app = express();

// connect database
connection();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

export default app;
