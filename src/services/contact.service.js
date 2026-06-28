const contactRepository = require('../repositories/contact.repository');
const AppError = require('../utils/AppError');


const getAll = async () => {
    return await contactRepository.findAll();
};

const getById = async (req, res, next) => {
    try {

        const contact =
            await contactService.getById(
                req.params.id
            );

        res.json(contact);

    } catch (err) {
        next(err);
    }
};


const create = async (data) => {

    return await contactRepository.create(data);

};

const update = async (id, contactData) => {

    const existingContact =
        await contactRepository.findById(id);

    if (!existingContact) {
        throw new AppError(
            'Contact not found',
            404
        );
    }

    return await contactRepository.update(
        id,
        contactData
    );
};

const remove = async (id) => {

    const existingContact =
        await contactRepository.findById(id);

    if (!existingContact) {
        throw new AppError(
            'Contact not found',
            404
        );
    }

    return await contactRepository.remove(id);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};