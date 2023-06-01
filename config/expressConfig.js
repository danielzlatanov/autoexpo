const express = require('express');
const hbs = require('express-handlebars').create({
  extname: '.hbs',
});
const cookieParser = require('cookie-parser');
const defaultTitle = require('../middlewares/defaultTitle.js');
const auth = require('../middlewares/auth.js');
const userNav = require('../middlewares/userNav.js');

const jwtSecret = 'super-secret-stuff-qwerty-010010';

module.exports = (app) => {
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('static'));
  app.use(cookieParser());
  app.use(auth(jwtSecret));
  app.use(userNav());

  app.use(defaultTitle('Auto Expo'));
};
