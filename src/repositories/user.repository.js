const pool = require('../config/db');

const findAll = async () => {

    const result = await pool.query(
        'SELECT * FROM users'
    );

    return result.rows;
};

const findByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT * FROM users
        WHERE email = $1`, 
        [email]
    );
    return result.rows[0]; 
};

const findById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

const create = async (data) => {
    const result = await pool.query(
        `
        INSERT INTO users 
        (
            name, 
            email, 
            password,
            role
        )
        VALUES ($1, $2, $3, $4)
        RETURNING * 
        `,
        [
            data.name,
            data.email,
            data.password,
            data.role
        ]
    );
    return result.rows[0];
};

const update = async (id, data) => {

    const result = await pool.query(

        `
        UPDATE users

        SET

            name = $1,
            email = $2,
            role = $3

        WHERE id = $4

        RETURNING *

        `,

        [

            data.name,
            data.email,
            data.role,
            id

        ]

    );

    return result.rows[0];

};

const remove = async (id) => {

    await pool.query(

        `
        DELETE FROM users
        WHERE id = $1
        `,

        [id]

    );

};



module.exports = {
    findAll,
    findByEmail,
    findById,
    create,
    remove,
    update
};

