const { z } = require('zod');

const activitySchema = z.object({

    deal_id:

        z.number(),

    contact_id:

        z.number(),

    type:

        z.enum([
            'call',
            'email',
            'meeting',
            'task'
        ]),

    description:

        z.string()
            .min(2)

});

module.exports = {

    activitySchema

};