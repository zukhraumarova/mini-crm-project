const pool = require('../config/db');

const findAll = async () => {

    const result = await pool.query(`
        SELECT

            a.id,
            a.type,
            a.description,
            a.created_at,

            d.id AS deal_id,
            d.title AS deal_title,

            c.id AS contact_id,
            c.full_name AS contact_name

        FROM activities a

        JOIN deals d
            ON a.deal_id = d.id

        JOIN contacts c
            ON a.contact_id = c.id

        ORDER BY a.created_at DESC
    `);

    return result.rows;
};

const findById = async (id) => {

    const result = await pool.query(`
        SELECT

            a.*,

            d.title AS deal_title,

            c.full_name AS contact_name

        FROM activities a

        JOIN deals d
            ON a.deal_id = d.id

        JOIN contacts c
            ON a.contact_id = c.id

        WHERE a.id = $1
    `, [id]);

    return result.rows[0];
};

const create = async (data) => {

    const result = await pool.query(`
        INSERT INTO activities
        (
            deal_id,
            contact_id,
            type,
            description
        )

        VALUES ($1,$2,$3,$4)

        RETURNING *
    `,
    [

        data.deal_id,
        data.contact_id,
        data.type,
        data.description

    ]);

    return result.rows[0];
};

const update = async (id,data)=>{

    const result = await pool.query(`
        UPDATE activities

        SET

            deal_id=$1,
            contact_id=$2,
            type=$3,
            description=$4

        WHERE id=$5

        RETURNING *
    `,
    [

        data.deal_id,
        data.contact_id,
        data.type,
        data.description,
        id

    ]);

    return result.rows[0];

};

const remove = async(id)=>{

    await pool.query(
        `
        DELETE FROM activities

        WHERE id=$1
        `,
        [id]
    );

};

module.exports={

    findAll,
    findById,
    create,
    update,
    remove

};