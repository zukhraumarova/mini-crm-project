const pool = require('../config/db');

const create = async (data) => {

    const result = await pool.query(

        `INSERT INTO chat_messages
        (deal_id, contact_id, role, message)

        VALUES ($1, $2, $3, $4)

        RETURNING *`,

        [

            data.deal_id,

            data.contact_id,

            data.role,

            data.message

        ]

    );

    return result.rows[0];

};

const getHistory = async (dealId) => {

    const result = await pool.query(

        `SELECT *

        FROM chat_messages

        WHERE deal_id=$1

        ORDER BY created_at`,

        [dealId]

    );

    return result.rows;

};

const getConversation = async (dealId) => {

    const result = await pool.query(

        `SELECT role, message

         FROM chat_messages

         WHERE deal_id = $1

         ORDER BY created_at`,

        [dealId]

    );

    return result.rows;

};

module.exports = {

    create,
    getHistory,
    getConversation

};