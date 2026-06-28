const create = async (
    client,
    dealId,
    oldStage,
    newStage
) => {

    const result = await client.query(

        `
        INSERT INTO deal_stage_history
        (
            deal_id,
            old_stage,
            new_stage
        )

        VALUES
        (
            $1,
            $2,
            $3
        )

        RETURNING *
        `,

        [
            dealId,
            oldStage,
            newStage
        ]

    );

    return result.rows[0];

};

module.exports = {

    create

};