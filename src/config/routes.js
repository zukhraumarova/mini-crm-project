const authRoutes = require('../routes/auth_route');
const companyRoutes = require('../routes/company_route');
const contactRoutes = require('../routes/contact_route');
const userRoutes=require('../routes/user_route');
const dealRoutes=require('../routes/deal_route');
const activityRoutes = require('../routes/activity_route');
const dashboardRoutes = require('../routes/dashboard_route');
const reportRoutes = require('../routes/report_route');
const jobRoutes = require('../routes/job_route');
const chatRoutes = require('../routes/chat_route');

const loadRoutes = (app) => {
    app.use('/auth', authRoutes);
    app.use('/companies', companyRoutes);
    app.use('/contacts', contactRoutes);
    app.use('/users', userRoutes);
    app.use('/deals', dealRoutes);
    app.use('/activities', activityRoutes);
    app.use('/dashboard', dashboardRoutes);
    app.use('/reports', reportRoutes);
    app.use('/jobs', jobRoutes);
    app.use('/chat', chatRoutes);
};

module.exports = loadRoutes;