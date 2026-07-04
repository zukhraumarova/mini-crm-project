const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact_controller');

const validate = require('../middlewares/validate_middleware');
const { contactSchema } = require('../validators/contact_validator');

router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post(
    '/',
    validate(contactSchema),
    contactController.create
);

router.put(
    '/:id',
    validate(contactSchema),
    contactController.update
);

router.delete(
    '/:id',
    contactController.remove 
);

module.exports = router;