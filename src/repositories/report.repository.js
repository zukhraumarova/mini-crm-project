const pool =
require('../config/db');

const getPipeline =
async(filters)=>{

    let sql =

`
SELECT

stage,

COUNT(*) AS deals_count,

SUM(amount::numeric) AS total_amount

FROM deals
`;

    const values=[];

    const where=[];

    if(filters.ownerId){

        values.push(
            filters.ownerId
        );

        where.push(

`owner_id = $${values.length}`

        );

    }

    if(filters.stage){

        values.push(
            filters.stage
        );

        where.push(

`stage = $${values.length}`

        );

    }

    if(filters.from){

        values.push(
            filters.from
        );

        where.push(

`created_at >= $${values.length}`

        );

    }

    if(filters.to){

        values.push(
            filters.to
        );

        where.push(

`created_at <= $${values.length}`

        );

    }

    if(where.length){

        sql +=

`
WHERE
`+

where.join(
' AND '
);

    }

    sql +=

`

GROUP BY stage

ORDER BY stage

`;

    const result =
    await pool.query(

        sql,

        values

    );

    return result.rows;

};

const getPipelineView = async () => {

    const result = await pool.query(`

        SELECT *

        FROM vw_pipeline_report

        ORDER BY owner_id, stage

    `);

    return result.rows;

};

module.exports = {

    ...

    getPipelineView

};

module.exports={

    getPipeline,
    getPipelineView

};