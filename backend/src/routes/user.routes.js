const { Router } = require('express');

const UserController = require('../controllers/user.controller');

const routes = Router();

routes.post('/', UserController.createUser);

module.exports = routes;
