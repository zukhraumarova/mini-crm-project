const express = require('express');

const router = express.Router();

const reportController =
    require('../controllers/report_controller');

router.get(

    '/pipeline',

    reportController.getPipeline

);

router.get(

    '/pipeline-view',

    reportController.getPipelineView

);

module.exports = router;