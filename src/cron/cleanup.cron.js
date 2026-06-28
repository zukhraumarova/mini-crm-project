const cron = require('node-cron');

const cleanupService =
    require('../services/cleanup.service');

cron.schedule(

    '*/1 * * * *',

    async () => {

        console.log(
            'Cron started'
        );

        await cleanupService.cleanup();

    }

);

console.log(
    'Cleanup cron loaded'
);