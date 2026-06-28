const activityRepository = require('../repositories/activity.repository');
const dealRepository = require('../repositories/deal.repository');

const AppError = require('../utils/AppError');

const getAll = async () => {

    return await activityRepository.findAll();

};

const getById = async (id) => {

    const activity =
        await activityRepository.findById(id);

    if (!activity) {

        throw new AppError(
            'Activity not found',
            404
        );

    }

    return activity;

};

const { getIO } = require('../socket');


const create = async (data) => {

    const activity = await activityRepository.create(data);

    const deal = await dealRepository.findById(activity.deal_id);

    const io = getIO();

    io.to('admin').emit(
        'activityCreated',
        activity
    );

    io.to('manager').emit(
        'activityCreated',
        activity
    );

    return activity;

};

const update = async (id,data)=>{

    const activity =
        await activityRepository.findById(id);

    if(!activity){

        throw new AppError(
            'Activity not found',
            404
        );

    }

    return await activityRepository.update(
        id,
        data
    );

};

const remove = async(id)=>{

    const activity =
        await activityRepository.findById(id);

    if(!activity){

        throw new AppError(
            'Activity not found',
            404
        );

    }

    await activityRepository.remove(id);

};

module.exports={

    getAll,
    getById,
    create,
    update,
    remove

};