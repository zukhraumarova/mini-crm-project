const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query(`
        SELECT
            c.*,
            comp.name as company_name
        FROM contacts c
        JOIN companies comp
            ON c.company_id = comp.id
    `);

    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query(`
        SELECT 
            c.*,
            comp.name as company_name
        FROM contacts c
        JOIN companies comp
            ON c.company_id = comp.id
        WHERE c.id = $1
        `,
        [id]
    );

    return result.rows[0];
}

const create = async ({
    company_id, 
    full_name, 
    email,
    phone
}) => {
    const result = await pool.query(
        `
        INSERT INTO contacts
        (
            company_id,
            full_name,
            email,
            phone
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
            company_id,
            full_name,
            email,
            phone
        ]
    );

    return result.rows[0];
};

const update = async (
    id,
    {
        company_id,
        full_name,
        email,
        phone
    }
) => {

    const result = await pool.query(
        `
        UPDATE contacts
        SET
            company_id = $1,
            full_name = $2,
            email = $3,
            phone = $4
        WHERE id = $5
        RETURNING *
        `,
        [
            company_id,
            full_name,
            email,
            phone,
            id
        ]
    );

    return result.rows[0];
};

const remove = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM contacts
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};



module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};