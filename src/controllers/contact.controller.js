const contactService = require('../services/contact.service');

const getAll = async (req, res, next) => {
    try {

        const contacts = await contactService.getAll();

        res.json(contacts);

    } catch (err) {

        next(err);

    }
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

const create = async (req, res, next) => {
    try {

        const contact = await contactService.create(
            req.body
        );

        res.status(201).json(contact);

    } catch (err) {

        next(err);

    }
};

const update = async (req, res, next) => {
    try {

        const contact = await contactService.update(
            req.params.id,
            req.body
        );

        res.json(contact);

    } catch (err) {

        next(err);

    }
};

const remove = async (req, res, next) => {
    try {

        const contact = await contactService.remove(
            req.params.id
        );

        res.json({
            message: 'Contact deleted successfully',
            contact
        });

    } catch (err) {

        next(err);

    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};





