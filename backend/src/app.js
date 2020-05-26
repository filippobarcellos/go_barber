import express from 'express';

import routes from './routes';
import connection from './config/database';
import uploadConfig from './config/upload';

const app = express();

// connect database
connection();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

export default app;
