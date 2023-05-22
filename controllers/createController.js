const { createCar } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('create', {
		title: 'Create Page',
	});
});

router.post('/', async (req, res) => {
	try {
		throw new Error('an error occurred while creating....')
		const result = await createCar(req.body);
		res.redirect('/catalog/' + result.id);
	} catch (err) {
		res.render('create', {
			title: 'Request Error',
			error: err.message,
		});
	}
});

module.exports = router;
