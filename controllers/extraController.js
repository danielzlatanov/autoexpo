const { getCarById } = require('../services/carService.js');
const {
  createExtra,
  getExtras,
  modifyCarExtras,
} = require('../services/extraService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('createExtras', {
    title: 'Add Car Extras',
  });
});

router.post('/', async (req, res) => {
  try {
    let icon = req.body.icon;
    if (!icon) {
      icon = 'dollar-sign.png';
    }

    await createExtra(req.body.title, icon);
    res.render('createExtras', {
      title: 'Success',
      successMsg: 'saved',
    });
  } catch (err) {
    res.render('createExtras', {
      title: 'An Error Occurred',
      titleErr: err.message.split('title: ')[1],
    });
    console.error(err.message);
  }
});

router.get('/:carId/car-extras', async (req, res) => {
  const carId = req.params.carId;
  const car = await getCarById(carId);
  const extras = await getExtras();
  extras.forEach((e) => {
    if (car.extras.some((x) => x._id.toString() == e._id.toString())) {
      e.checked = true;
    }
  });

  res.render('editCarExtras', {
    title: 'Update Car Extras',
    car,
    extras,
  });
});

router.post('/:carId/car-extras', async (req, res) => {
  try {
    const carId = req.params.carId;

    await modifyCarExtras(carId, Object.keys(req.body));
    res.redirect('/edit/' + carId + '/car-extras');
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
