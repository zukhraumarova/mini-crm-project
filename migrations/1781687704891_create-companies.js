exports.up = (pgm) => {
    pgm.createTable('companies', {
        id: {
            type: 'serial',
            primaryKey: true
        },

        name: {
            type: 'varchar(255)',
            notNull: true
        },

        industry: {
            type: 'varchar(255)',
            notNull: true
        },

        website: {
            type: 'varchar(50)',
            unique: true,
            notNull: true
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('companies');
};