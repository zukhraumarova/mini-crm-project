const { Worker } = require('bullmq');

const connection =
    require('../config/redis');

const worker = new Worker(

    'emailQueue',

    async (job) => {

        console.log('========================');
        console.log('New Job');
        console.log(job.data);

        console.log(
            'Sending email to',
            job.data.email
        );

        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        );

        console.log('Email sent!');
        console.log('========================');

    },

    {
        connection
    }

);

worker.on(
    'completed',
    (job) => {

        console.log(
            'Job completed:',
            job.id
        );

    }
);

worker.on(
    'failed',
    (job, err) => {

        console.log(err.message);

    }
);