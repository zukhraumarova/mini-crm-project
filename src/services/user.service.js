const userRepository = require('../repositories/user.repository');


const getAll = async () => {
    return await userRepository.findAll();
};

const getById = async (id) => {

    const user =
        await userRepository.findById(id);

    if (!user) {

        throw new AppError(
            'User not found',
            404
        );

    }

    return user;

};




const create = async (data) => {

    return await userRepository.create(data);

};

const update = async (id, data) => {

    const user =
        await userRepository.findById(id);

    if (!user) {

        throw new AppError(
            'User not found',
            404
        );

    }

    return await userRepository.update(
        id,
        data
    );

};

const remove = async (id) => {

    const user =
        await userRepository.findById(id);

    if (!user) {

        throw new AppError(
            'User not found',
            404
        );

    }

    await userRepository.remove(id);

};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
