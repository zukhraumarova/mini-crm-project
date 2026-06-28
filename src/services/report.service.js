const reportRepository =
require('../repositories/report.repository');

const getPipeline =
async(filters)=>{

    return await
    reportRepository.getPipeline(
        filters
    );

};

module.exports={

    getPipeline

};