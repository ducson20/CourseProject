require('dotenv').config();
const path = require('path');
const express = require('express');
//Gọi express thì sẽ trả về đối tượng là app của bạn
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const port = 8000;
const route = require('./router');

//
const mongo = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//Passport config
require('./config/passport')(passport);
require('./config/pass')(passport);
//Connect to DB
const db = require('./config/db');
const { request } = require('express');
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: function (a, b) {
      return a + b;
    },
    sortable: function (field, sort) {
      //field, sort: trường map trong db ở bên view
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      }
      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
      </a>`;
    }
  }
}));
app.set('view engine', 'hbs');
//Sessions
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongo.connection })
}))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
app.use((req, res, next)=>{
  app.locals.success = req.flash('success')
  next();
});
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log('PATH: ', path.join(__dirname, 'resources', 'views'));
app.use(express.urlencoded({
  extended: true // Lấy ra body data 
}));
app.use(express.json());
app.use(methodOverride('_method'));
//Home, search, contact
//Custom middleware
app.use(SortMiddleware);
//Rote Init
route(app);
// console.log('dsadsa:   ' + process.env.GOOGLE_CLIENT_ID);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})