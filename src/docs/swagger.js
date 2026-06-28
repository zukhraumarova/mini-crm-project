const swaggerDocument = {

    openapi: '3.0.0',

    info: {
        title: 'Mini CRM API',
        version: '1.0.0'
    },

    paths: {

        '/companies': {

            get: {
                summary: 'Get companies'
            }

        }

    }

};

module.exports = swaggerDocument;