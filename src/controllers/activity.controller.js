const activityService =
require('../services/activity.service');

const getAll = async(req,res,next)=>{

    try{

        const activities =
            await activityService.getAll();

        res.json(activities);

    }

    catch(err){

        next(err);

    }

};

const getById = async(req,res,next)=>{

    try{

        const activity =
            await activityService.getById(
                req.params.id
            );

        res.json(activity);

    }

    catch(err){

        next(err);

    }

};

const create = async(req,res,next)=>{

    try{

        const activity =
            await activityService.create(
                req.body
            );

        res.status(201).json(activity);

    }

    catch(err){

        next(err);

    }

};

const update = async(req,res,next)=>{

    try{

        const activity =
            await activityService.update(
                req.params.id,
                req.body
            );

        res.json(activity);

    }

    catch(err){

        next(err);

    }

};

const remove = async(req,res,next)=>{

    try{

        await activityService.remove(
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

module.exports={

    getAll,
    getById,
    create,
    update,
    remove

};