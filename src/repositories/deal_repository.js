const pool = require('../config/db');

const dealStageHistoryRepository = require('./deal_stage_history_repository');

const findAll = async () => {

    const result = await pool.query(
        `SELECT 
        d.id,
        d.created_at,
        c.id as company_id,
        c.name as company_name,
        o.id as owner_id,
        o.name as owner_name,
        d.title,
        d.amount,
        d.stage
        FROM deals d
        LEFT JOIN companies c on d.company_id = c.id
        LEFT JOIN users o on d.owner_id = o.id
        ORDER BY d.id
        `
    );

    return result.rows;
};

const findById = async (id) => {

    const result = await pool.query(
        `
        SELECT
        d.id,
        d.created_at,
        c.id as company_id,
        c.name as company_name,
        o.id as owner_id,
        o.name as owner_name,
        d.title,
        d.amount,
        d.stage
        FROM deals d
        LEFT JOIN companies c on d.company_id = c.id
        LEFT JOIN users o on d.owner_id = o.id
        WHERE d.id = $1
        `,
        [id]
    );

    return result.rows[0];
};

const create = async (data) => {
    const result = await pool.query(
        `
        INSERT INTO deals 
        (
            company_id, 
            owner_id, 
            title,
            amount,
            stage
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING * 
        `,
        [
            data.company_id,
            data.owner_id,
            data.title,
            data.amount,
            data.stage
        ]
    );
    return result.rows[0];
};

const update = async (id, data) => {

    const result = await pool.query(

        `
        UPDATE deals

        SET

            company_id = $1,
            owner_id = $2,
            title = $3,
            amount = $4,
            stage = $5

        WHERE id = $6

        RETURNING *

        `,

        [

            data.company_id,
            data.owner_id,
            data.title,
            data.amount,
            data.stage,
            id

        ]

    );

    return result.rows[0];

};


const remove = async (id) => {

    await pool.query(

        `
        DELETE FROM deals
        WHERE id = $1
        `,

        [id]

    );

};

const changeStage = async (id, newStage) => {

    // Получаем отдельное соединение
    const client = await pool.connect();

    try {

        // Начинаем транзакцию
        await client.query('BEGIN');

        // Получаем текущую стадию сделки
        const dealResult = await client.query(
            `
            SELECT *
            FROM deals
            WHERE id = $1
            `,
            [id]
        );

        const deal = dealResult.rows[0];

        if (!deal) {

            throw new Error('Deal not found');

        }

        const oldStage = deal.stage;

        // Обновляем стадию сделки
        const updatedResult = await client.query(
            `
            UPDATE deals

            SET stage = $1

            WHERE id = $2

            RETURNING *
            `,
            [
                newStage,
                id
            ]
        );

        // Сохраняем историю
        await dealStageHistoryRepository.create(
            client,
            id,
            oldStage,
            newStage
        );

        // Подтверждаем изменения
        await client.query('COMMIT');

        return updatedResult.rows[0];

    } catch (err) {

        // Если что-то пошло не так —
        // отменяем ВСЕ изменения
        await client.query('ROLLBACK');

        throw err;

    } finally {

        // Возвращаем соединение обратно в pool
        client.release();

    }

};

const findPage = async (lastId, limit) => {

    let query = `
        SELECT
            d.id,
            d.title,
            d.amount,
            d.stage,
            d.created_at,
            c.name AS company_name,
            o.name AS owner_name
        FROM deals d
        LEFT JOIN companies c
            ON d.company_id = c.id
        LEFT JOIN users o
            ON d.owner_id = o.id
    `;

    const params = [];

    if (lastId) {

        query += `
            WHERE d.id > $1
        `;

        params.push(lastId);

        query += `
            ORDER BY d.id
            LIMIT $2
        `;

        params.push(limit);

    } else {

        query += `
            ORDER BY d.id
            LIMIT $1
        `;

        params.push(limit);

    }

    const result = await pool.query(

        query,

        params

    );

    return result.rows;

};



module.exports = {
    findAll,
    findById,
    create,
    remove,
    update,
    changeStage,
    findPage
};

