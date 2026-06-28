const { z } = require('zod');


const contactSchema = z.object({

    company_id: z.number(),

    full_name: z
        .string()
        .min(2),

    email: z
        .string()
        .email(),

    phone: z
        .string()
        .optional()

});


module.exports = {
    contactSchema
};