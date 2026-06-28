const { z } = require('zod');

const companySchema = z.object({
    name: z.string().min(2),
    industry: z.string().min(2),
    website: z.string().url()
});

module.exports = {
    companySchema
};

