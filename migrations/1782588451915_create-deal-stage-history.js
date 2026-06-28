exports.up = (pgm) => {

    pgm.createTable(
        'deal_stage_history',
        {

            id: 'id',

            deal_id: {
                type: 'integer',
                notNull: true,
                references: 'deals',
                onDelete: 'cascade'
            },

            old_stage: {
                type: 'varchar(50)',
                notNull: true
            },

            new_stage: {
                type: 'varchar(50)',
                notNull: true
            },

            changed_at: {
                type: 'timestamp',
                default: pgm.func('current_timestamp')
            }

        }
    );

};

exports.down = (pgm) => {

    pgm.dropTable('deal_stage_history');

};