const {z}=require('zod');

const dealSchema=z.object({

    company_id:

        z.number(),

    owner_id:

        z.number(),

    title:

        z.string()
            .min(2),

    amount:

        z.string(),

    stage: z.enum([
    'new',
    'in_progress',
    'won',
    'lost'
    ])

});

module.exports={

    dealSchema

};