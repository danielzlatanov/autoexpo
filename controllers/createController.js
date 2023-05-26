const { createCar } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('create', {
		title: res.locals.title + ' Create',
	});
});

router.post('/', async (req, res) => {
	try {
		const result = await createCar(req.body);
		res.redirect('/catalog/' + result.id);
	} catch (err) {
		res.render('create', {
			title: 'Request Error',
			errors: err.message.split('\n'),
		});
	}
});

module.exports = router;
