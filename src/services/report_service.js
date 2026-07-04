const reportRepository =
require('../repositories/report_repository');

const getPipeline =
async(filters)=>{

    return await
    reportRepository.getPipeline(
        filters
    );

};

const getPipelineView = async () => {

    return await reportRepository.getPipelineView();

};

module.exports={

    getPipeline,
    getPipelineView

};