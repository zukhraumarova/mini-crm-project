const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Mini CRM API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3000"
    }
  ],
  components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
  paths: {
    "/companies": {
      get: {
        summary: "Получить список компаний",
        security: [
            {
                bearerAuth: []
            }
        ],
        responses: {
          "200": {
            description: "Список компаний",
            content: {
              "application/json": {
                example: [
                  {
                    id: 1,
                    name: "Google",
                    website: "https://google.com",
                    industry: "IT"
                  },
                  {
                    id: 2,
                    name: "Microsoft",
                    website: "https://microsoft.com",
                    industry: "Software"
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;