const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.put('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;