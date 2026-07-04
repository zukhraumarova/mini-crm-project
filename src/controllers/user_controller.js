const userService = require('../services/user_service');


const getAll = async (req, res, next) => {
    try {
        const data = await userService.getAll();

        res.json(data);

    } catch (err) {
        next(err);
    }
};

const getById = async (
    req,
    res,
    next
) => {

    try{

        const user =
            await userService.getById(
                req.params.id
            );

        res.json(user);

    }

    catch(err){

        next(err);

    }

};

const update = async (
    req,
    res,
    next
) => {

    try{

        const user =
            await userService.update(

                req.params.id,

                req.body

            );

        res.json(user);

    }

    catch(err){

        next(err);

    }

};
const remove = async (
    req,
    res,
    next
) => {

    try{

        await userService.remove(
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


module.exports = {
    getAll,
    getById,
    update,
    remove
};