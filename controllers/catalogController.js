const { getData, getCarById } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
	const search = req.query.search || '';
	const minPrice = Number(req.query.from) || 1;
	const maxPrice = Number(req.query.to) || 6000000;
	const cars = getData(search, minPrice, maxPrice);

	res.render('catalog', {
		title: res.locals.title + ' Catalog',
		cars,
		search,
		minPrice,
		maxPrice,
	});
});

router.get('/:id', (req, res) => {
	const carId = req.params.id;
	const car = getCarById(carId);
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
