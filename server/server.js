const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session(sess));

app.use(routes);


// Turn off sequelize for the moment to get it up and running, once models are done, activate


sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

