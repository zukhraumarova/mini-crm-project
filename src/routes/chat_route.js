const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat_controller');

router.post(
    '/',
    chatController.chat
);

router.get(

    '/stream',

    chatController.stream

);

module.exports = router;