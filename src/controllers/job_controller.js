const emailQueue =
require('../queues/email_queue');

const getStatus = async (

    req,
    res,
    next

)=>{

    try{

        const job =
        await emailQueue.getJob(
            req.params.id
        );

        if(!job){

            return res.status(404).json({

                message:'Job not found'

            });

        }

        const state =
        await job.getState();

        res.json({

            id:job.id,

            state

        });

    }

    catch(err){

        next(err);

    }

};

module.exports={

    getStatus

};