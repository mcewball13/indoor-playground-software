const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');



const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'super super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


const hbs = exphbs.create({helpers});
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);


// Turn off sequelize for the moment to get it up and running, once models are done, activate


sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

