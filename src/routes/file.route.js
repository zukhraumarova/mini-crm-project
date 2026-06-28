const express = require('express');
const router = express.Router();

const upload = require('../config/multer');
const fileController =
    require('../controllers/file.controller');

router.post(
    '/',
    upload.single('file'),
    fileController.upload
);

module.exports = router;