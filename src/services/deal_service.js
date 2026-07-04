const dealRepository=require('../repositories/deal_repository');

const AppError=require('../utils/AppError');

const getAll=async()=>{

    return await dealRepository.findAll();

};

const getById=async(id)=>{

    const deal=await dealRepository.findById(id);

    if(!deal){

        throw new AppError(
            'Deal not found',
            404
        );

    }

    return deal;

};

const create=async(data)=>{

    return await dealRepository.create(data);

};

const update=async(id,data)=>{

    const deal=await dealRepository.findById(id);

    if(!deal){

        throw new AppError(
            'Deal not found',
            404
        );

    }

    return await dealRepository.update(
        id,
        data
    );

};

const remove=async(id)=>{

    const deal=await dealRepository.findById(id);

    if(!deal){

        throw new AppError(
            'Deal not found',
            404
        );

    }

    await dealRepository.remove(id);

};

const changeStage = async (id, stage) => {

    const deal = await dealRepository.findById(id);

    if (!deal) {

        throw new AppError(
            'Deal not found',
            404
        );

    }

    return await dealRepository.changeStage(
        id,
        stage
    );

};

const getPage = async (lastId, limit) => {

    return await dealRepository.findPage(

        lastId,

        limit

    );

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