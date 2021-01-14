const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const loginRouter = require('./login');
const {checkAuthenticated, checkNotAuthenticated} = require('../app/middlewares/Auth');

function route(app) {
   
    app.use('/me', checkAuthenticated,meRouter);
    app.use('/courses', checkAuthenticated,coursesRouter);
    app.use('/auth',loginRouter);
    app.use('/',siteRouter);
}

module.exports = route;