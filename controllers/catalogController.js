const { getData, getCarById } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const cars = await getData(req.query.search, req.query.from, req.query.to);

  res.render('catalog', {
    title: res.locals.title + ' Catalog',
    cars,
    search: req.query.search,
    minPrice: req.query.from,
    maxPrice: req.query.to,
  });
});

router.get('/:id', async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await getCarById(carId);
    if (req.user && req.user._id == car.owner) {
      car.isOwner = true;
    }

    res.render('details', {
      title: 'Car Details',
      car,
    });
  } catch (err) {
    res.render('carNotFound', {
      title: 'Car Not Found',
      carId,
    });
  }
});

module.exports = router;
