const dashboardService =
require('../services/dashboard_service');

const getDashboard = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await dashboardService.getDashboard();

        res.json(data);

    } catch (err) {

        next(err);

    }

};

module.exports = {

    getDashboard

};