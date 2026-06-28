exports.up = (pgm) => {
    pgm.createTable('activities', {
        id: {
            type: 'serial',
            primaryKey: true
        },

        deal_id: {
            type: 'integer',
            notNull: true,
            references: 'deals(id)',
            onDelete: 'CASCADE'
        },

        contact_id: {
            type: 'integer',
            notNull: true,
            references: 'contacts(id)',
            onDelete: 'CASCADE'
        },

        type: {
            type: 'varchar(255)',
            notNull: true
        },

        description: {
            type: 'varchar(50)',
            notNull: true
        },

        created_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('activities');
};