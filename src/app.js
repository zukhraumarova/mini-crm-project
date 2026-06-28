console.log("APP.JS LOADED");
const express = require('express');
const path = require('path');

const companyRoutes = require('./routes/company.route');
const contactRoutes = require('./routes/contact.route');
const authRoutes = require('./routes/auth.route');

const errorMiddleware = require('./middlewares/error.middleware');

const morgan = require('morgan');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./docs/swagger');

const fileRoutes = require('./routes/file.route');

const userRoutes=require('./routes/user.route');

const dealRoutes=require('./routes/deal.route');

const activityRoutes = require('./routes/activity.route');

const dashboardRoutes = require('./routes/dashboard.route');

const reportRoutes = require('./routes/report.route');

const jobRoutes = require('./routes/job.route');

const compression = require('compression');

const sanitize = require('./middlewares/sanitize.middleware');

const cookieParser = require('cookie-parser');

const chatRoutes = require('./routes/chat.route');

const cors = require('cors');

const app = express();

app.use(cookieParser());

app.use(express.json({

    limit: '1mb'

}));

app.use(sanitize);

app.use(compression());

app.use(
    express.static(
        path.join(__dirname, '../frontend')
    )
);

app.use((req,res,next)=>{
    console.log("REQUEST:", req.method, req.url);
    next();
});


app.use('/companies', companyRoutes);
app.use('/contacts', contactRoutes);
app.use('/auth', authRoutes);

app.use(errorMiddleware);

app.use(morgan('dev'));

app.use(helmet());

app.use(limiter);

app.use(
    cors({
        origin: ['http://localhost:5500'],
        credentials: true
    })
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

app.use('/users', userRoutes);

app.use('/deals', dealRoutes);

app.use('/activities', activityRoutes);

app.use('/dashboard', dashboardRoutes);

app.use('/reports', reportRoutes);

app.use('/jobs', jobRoutes);

app.use('/chat', chatRoutes);



module.exports = app;