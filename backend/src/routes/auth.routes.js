const { Router } = require('express');

const SessionController = require('../controllers/session.controller');

const routes = Router();

routes.post('/', SessionController.createSession);

module.exports = routes;
