const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company_controller');

const validate = require('../middlewares/validate_middleware');
const { companySchema } = require('../validators/company_validator');

const authMiddleware =
    require('../middlewares/auth_middleware');

const roleMiddleware =
require('../middlewares/role_middleware');

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