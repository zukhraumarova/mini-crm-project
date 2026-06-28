const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company.controller');

const validate = require('../middlewares/validate.middleware');
const { companySchema } = require('../validators/company.validator');

const authMiddleware =
    require('../middlewares/auth.middleware');

const roleMiddleware =
require('../middlewares/role.middleware');

router.get(
    '/',
    authMiddleware,
    companyController.getAll
);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    validate(companySchema),
    companyController.create
);

module.exports = router;