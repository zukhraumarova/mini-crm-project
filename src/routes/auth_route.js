const express = require('express');

const router = express.Router();

const middleware = require('../middlewares/auth_validation');
const controller = require('../controllers/auth_controller');

router.post('/register', middleware.validateRegister, controller.register);

router.post('/login', middleware.validateLogin, controller.login);

module.exports = router;