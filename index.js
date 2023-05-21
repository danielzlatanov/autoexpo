const express = require('express');
const hbs = require('express-handlebars').create({
	extname: '.hbs',
});
const port = 3000;

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.listen(port, () => console.log('server listening on port ' + port + '...'));
