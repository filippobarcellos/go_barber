const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
