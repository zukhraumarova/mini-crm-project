const express=require('express');
const authenticate = require('../middlewares/auth_middleware');

const router=express.Router();

const dealController=require('../controllers/deal_controller');

const validate=require('../middlewares/validate_middleware');

const {dealSchema}=require('../validators/deal_validator');

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