exports.up = (pgm) => {
    pgm.createTable('deals', {
        id: {
            type: 'serial',
            primaryKey: true
        },

        company_id: {
            type: 'integer',
            notNull: true,
            references: 'companies(id)',
            onDelete: 'CASCADE'
        },

        owner_id: {
            type: 'integer',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE'
        },

        title: {
            type: 'varchar(255)',
            notNull: true
        },

        amount: {
            type: 'integer',
            notNull: true
        },

        stage: {
            type: 'varchar(50)',
            notNull: true
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('deals');
};