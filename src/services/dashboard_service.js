const companyService = require('./company_service');
const contactService = require('./contact_service');
const dealService = require('./deal_service');
const activityService = require('./activity_service');
const userRepository = require('../repositories/user_repository');

const getDashboard = async () => {

    const results = await Promise.allSettled([

        companyService.getAll(),

        contactService.getAll(),

        dealService.getAll(),

        activityService.getAll(),

        userRepository.findAll()

    ]);

    return {

        companies:
            results[0].status === 'fulfilled'
                ? results[0].value
                : [],

        contacts:
            results[1].status === 'fulfilled'
                ? results[1].value
                : [],

        deals:
            results[2].status === 'fulfilled'
                ? results[2].value
                : [],

        activities:
            results[3].status === 'fulfilled'
                ? results[3].value
                : [],

        users:
            results[4].status === 'fulfilled'
                ? results[4].value
                : []

    };

};

module.exports = {

    getDashboard

};