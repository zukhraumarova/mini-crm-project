exports.up = (pgm) => {
    pgm.createTable('contacts', {
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

        full_name: {
            type: 'varchar(255)',
            notNull: true
        },

        email: {
            type: 'varchar(255)'
        },

        phone: {
            type: 'varchar(50)'
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('contacts');
};