const companyRepository = require('../repositories/company_repository');
const redis = require('../config/redis');


const getAll = async () => {

    const cache = await redis.get(

        'companies'

    );

    if (cache) {

        console.log('📦 Companies from Redis');

        return JSON.parse(cache);

    }

    console.log('🗄 Companies from PostgreSQL');

    const companies =

        await companyRepository.findAll();

    await redis.set(

        'companies',

        JSON.stringify(companies),

        'EX',

        60

    );

    return companies;

};


const create = async (data) => {

    const company =

        await companyRepository.create(data);

    await redis.del(

        'companies'

    );

    console.log(

        '🗑 Companies cache cleared'

    );

    return company;

};


module.exports = {
    getAll,
    create
};