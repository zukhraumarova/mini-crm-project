const companyService = require('../services/company.service');


const getAll = async (req, res, next) => {
    try {
        const data = await companyService.getAll();

        res.json(data);

    } catch (err) {
        next(err);
    }
};


const create = async (req, res, next) => {
    try {

        console.log("CREATE BODY:", req.body);

        const company = await companyService.create(req.body);

        console.log("CREATED:", company);

        res.status(201).json(company);

    } catch (err) {
        console.log("CREATE ERROR:", err);
        next(err);
    }
};


module.exports = {
    getAll,
    create
};