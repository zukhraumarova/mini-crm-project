const express = require('express');

const router = express.Router();

const activityController =
require('../controllers/activity.controller');

const validate =
require('../middlewares/validate.middleware');

const {
    activitySchema
} =
require('../validators/activity.validator');

router.get(
    '/',
    activityController.getAll
);

router.get(
    '/:id',
    activityController.getById
);

router.post(
    '/',
    validate(activitySchema),
    activityController.create
);

router.put(
    '/:id',
    validate(activitySchema),
    activityController.update
);

router.delete(
    '/:id',
    activityController.remove
);

module.exports = router;