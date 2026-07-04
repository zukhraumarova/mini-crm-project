const express = require('express');
const path = require('path');
const app = express();

const errorMiddleware = require('./middlewares/error_middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');
const fileRoutes = require('./routes/file_route');

const loadMiddlewares = require('./config/middlewares');
const loadRoutes = require('./config/routes');

loadMiddlewares(app);

loadRoutes(app);

app.use(
    express.static(
        path.join(__dirname, '../frontend')
    )
);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(
    '/files',
    fileRoutes
);

app.use(
    '/uploads',
    express.static(
    'uploads'
    )
);

app.use(errorMiddleware);

module.exports = app;