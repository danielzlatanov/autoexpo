const { getData, getCarById } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
	const cars = await getData();

	res.render('catalog', {
		title: res.locals.title + ' Catalog',
		cars,
	});
});

router.get('/:id', async (req, res) => {
	const carId = req.params.id;
	const car = await getCarById(carId);

	if (car) {
		return res.render('details', {
			title: 'Car Details',
			car,
		});
	}

	res.render('carNotFound', {
		title: 'Car Not Found',
		carId,
	});
});

module.exports = router;
