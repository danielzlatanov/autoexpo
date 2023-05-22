const { getData, getCarById } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
	const cars = getData();
	res.render('catalog', {
		title: 'Catalog Page',
		cars,
	});
});

router.get('/:id', (req, res) => {
	const carId = req.params.id;
	const car = getCarById(carId);
	if (car) {
		return res.render('details', {
			title: 'Catalog Details Page',
			car,
		});
	}
	res.render('carNotFound', {
		title: 'Car Not Found',
		carId,
	});
});

module.exports = router;
