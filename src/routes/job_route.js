const express =
require('express');

const router =
express.Router();

const jobController =
require('../controllers/job_controller');

router.get(

    '/:id',

    jobController.getStatus

);

module.exports =
router;