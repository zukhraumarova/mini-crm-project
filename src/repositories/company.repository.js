const pool = require('../config/db');


const findAll = async () => {

    const result = await pool.query(
        'SELECT * FROM companies'
    );

    return result.rows;
};


const create = async (company) => {


    const result = await pool.query(
        `
        INSERT INTO companies
        (name, industry, website)

        VALUES ($1,$2,$3)

        RETURNING *
        `,
        [
            company.name,
            company.industry,
            company.website
        ]
    );


    return result.rows[0];

};


module.exports = {
    findAll,
    create
};