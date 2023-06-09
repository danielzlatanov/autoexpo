const { getData, getCarById } = require('../services/carService.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const cars = await getData(req.query.search);

  res.render('catalog', {
    title: res.locals.title + ' Catalog',
    cars,
    search: req.query.search,
  });
});

router.get('/:id', async (req, res) => {
  const carId = req.params.id;
  const car = await getCarById(carId);

  if (req.user && req.user._id == car.owner) {
    car.isOwner = true;
  }

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
