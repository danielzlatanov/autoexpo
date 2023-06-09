const { getCarById, editCar, deleteCar } = require('../services/carService.js');

const router = require('express').Router();

router.get('/edit/:id', async (req, res) => {
  const car = await getCarById(req.params.id);
  if (!req.user || car.owner != req.user._id) {
    return res.redirect('/auth/login');
  }

  res.render('edit', {
    title: 'Edit Car',
    car,
  });
});

router.post('/edit/:id', async (req, res) => {
  const carId = req.params.id;
  const car = await getCarById(carId);
  if (!req.user || car.owner != req.user._id) {
    return res.redirect('/auth/login');
  }

  try {
    const result = await editCar(req.body, carId);
    res.redirect('/catalog/' + result._id);
  } catch (err) {
    req.body._id = carId;
    res.render('edit', {
      title: 'Edit Car Error',
      errors: err.message.split('\n'),
      car: req.body,
    });
  }
});

router.get('/delete/:id', async (req, res) => {
  const car = await getCarById(req.params.id);
  if (!req.user || car.owner != req.user._id) {
    return res.redirect('/auth/login');
  }

  res.render('delete', {
    title: 'Delete Car',
    car,
  });
});

router.post('/delete/:id', async (req, res) => {
  const carId = req.params.id;
  const car = await getCarById(carId);
  if (!req.user || car.owner != req.user._id) {
    return res.redirect('/auth/login');
  }

  try {
    await deleteCar(carId);
    res.redirect('/catalog');
  } catch (err) {
    req.body._id = carId;
    res.render('delete', {
      title: 'Delete Car Error',
      errors: err.message.split('\n'),
      car: req.body,
    });
  }
});

module.exports = router;
