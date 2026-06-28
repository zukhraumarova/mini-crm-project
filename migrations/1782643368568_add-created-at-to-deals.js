exports.up = (pgm) => {

    pgm.addColumn(

        'deals',

        {

            created_at: {

                type: 'timestamp',

                default: pgm.func('current_timestamp')

            }

        }

    );

};

exports.down = (pgm) => {

    pgm.dropColumn(

        'deals',

        'created_at'

    );

};