const dealService=require('../services/deal_service');

const getAll=async(req,res,next)=>{

    try{

        const deals=
            await dealService.getAll();

        res.json(deals);

    }

    catch(err){

        next(err);

    }

};

const getById=async(req,res,next)=>{

    try{

        const deal=
            await dealService.getById(
                req.params.id
            );

        res.json(deal);

    }

    catch(err){

        next(err);

    }

};

const create=async(req,res,next)=>{

    try{

        const deal=
            await dealService.create(
                req.body
            );

        res.status(201).json(deal);

    }

    catch(err){

        next(err);

    }

};

const update=async(req,res,next)=>{

    try{

        const deal=
            await dealService.update(
                req.params.id,
                req.body
            );

        res.json(deal);

    }

    catch(err){

        next(err);

    }

};

const remove=async(req,res,next)=>{

    try{

        await dealService.remove(
            req.params.id
        );

        res.json({

            success:true

        });

    }

    catch(err){

        next(err);

    }

};

const changeStage = async (
    req,
    res,
    next
) => {

    try {

        const deal =
            await dealService.changeStage(

                req.params.id,

                req.body.stage

            );

        res.json(deal);

    }

    catch (err) {

        next(err);

    }

};

const getPage = async (req, res, next) => {

    try {

        const lastId = req.query.lastId
            ? Number(req.query.lastId)
            : null;

        const limit = req.query.limit
            ? Number(req.query.limit)
            : 5;

        const deals = await dealService.getPage(

            lastId,

            limit

        );

        res.json({

            success: true,

            data: deals

        });

    } catch (err) {

        next(err);

    }

};

module.exports={

    getAll,
    getById,
    create,
    update,
    remove,
    changeStage,
    getPage

};