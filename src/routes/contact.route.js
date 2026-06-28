const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');

const validate = require('../middlewares/validate.middleware');
const { contactSchema } = require('../validators/contact.validator');

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