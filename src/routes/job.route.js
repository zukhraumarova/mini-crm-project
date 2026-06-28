const express =
require('express');

const router =
express.Router();

const jobController =
require('../controllers/job.controller');

router.get(

    '/:id',

    jobController.getStatus

);

module.exports =
router;