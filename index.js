const port = 3000;
const express = require('express');
const hbs = require('express-handlebars').create({
	extname: '.hbs',
});
const defaultController = require('./controllers/defaultController.js');
const homeController = require('./controllers/homeController.js');
const catalogController = require('./controllers/catalogController.js');
const createController = require('./controllers/createController.js');
const defaultTitle = require('./middlewares/defaultTitle.js');

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(defaultTitle('Page View'));

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);

app.all('*', defaultController);

app.listen(port, () => console.log('server listening on port ' + port + '...'));
