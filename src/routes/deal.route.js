const express=require('express');
const authenticate = require('../middlewares/auth.middleware');

const router=express.Router();

const dealController=require('../controllers/deal.controller');

const validate=require('../middlewares/validate.middleware');

const {dealSchema}=require('../validators/deal.validator');

router.get(
    '/',
    dealController.getAll
);

router.get('/page', authenticate, dealController.getPage);


router.get(
    '/:id',
    dealController.getById
);

router.post(
    '/',
    validate(dealSchema),
    dealController.create
);

router.put(
    '/:id/stage',
    dealController.changeStage

);

router.put(
    '/:id',
    validate(dealSchema),
    dealController.update
);

router.delete(
    '/:id',
    dealController.remove
);

module.exports=router;