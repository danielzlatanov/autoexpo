const { getCarById, editCar } = require('../services/carService.js');

const router = require('express').Router();

router.get('/edit/:id', async (req, res) => {
  const car = await getCarById(req.params.id);
  res.render('edit', {
    title: 'Edit Car',
    car,
  });
});

router.post('/edit/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const result = await editCar(req.body, carId);
    res.redirect('/catalog/' + result._id);
  } catch (err) {
    req.body._id = carId;
    res.render('edit', {
      title: 'Request Error',
      errors: err.message.split('\n'),
      car: req.body,
    });
  }
});

module.exports = router;
