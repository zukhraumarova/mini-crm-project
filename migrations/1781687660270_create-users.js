exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'serial',
            primaryKey: true
        },

        name: {
            type: 'varchar(255)',
            notNull: true
        },

        email: {
            type: 'varchar(255)',
            unique: true,
            notNull: true
        },

        role: {
            type: 'varchar(50)',
            notNull: true
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};