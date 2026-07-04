const reportService =
require('../services/report_service');

const getPipeline = async (

    req,
    res,
    next

)=>{

    try{

        const result =
        await reportService.getPipeline(
            req.query
        );

        res.json(result);

    }

    catch(err){

        next(err);

    }

};

const getPipelineView = async (req, res) => {

    const data =

        await reportService.getPipelineView();

    res.json(data);

};

module.exports={

    getPipeline,
    getPipelineView

};