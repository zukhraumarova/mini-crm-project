const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const sanitize = require('../middlewares/sanitize_middleware');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000
});

const loadMiddlewares = (app) => {

    app.use(morgan('dev'));

    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    );

    app.use(limiter);

    app.use(cookieParser());

    app.use(express.json({
        limit: '1mb'
    }));

    app.use(sanitize);

    app.use(compression());

    app.use(
        cors({
            origin:
                process.env.FRONTEND_URL ||
                "http://localhost:3000",
            credentials: true
        })
    );

};

module.exports = loadMiddlewares;