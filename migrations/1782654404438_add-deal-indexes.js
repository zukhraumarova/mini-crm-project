exports.up = (pgm) => {

    pgm.createIndex(

        'deals',

        'owner_id'

    );

    pgm.createIndex(

        'deals',

        'stage'

    );

    pgm.createIndex(

        'deals',

        'created_at'

    );

};

exports.down = (pgm) => {

    pgm.dropIndex(

        'deals',

        'owner_id'

    );

    pgm.dropIndex(

        'deals',

        'stage'

    );

    pgm.dropIndex(

        'deals',

        'created_at'

    );

};