exports.up = (pgm) => {

    pgm.addColumn(
        'users',
        {
            password: {
                type: 'varchar(255)',
                notNull: true,
                default: ''
            }
        }
    );

};

exports.down = (pgm) => {

    pgm.dropColumn(
        'users',
        'password'
    );

};