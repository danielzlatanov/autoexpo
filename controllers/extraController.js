const { hasRole } = require('../middlewares/guards.js');
const { getCarById } = require('../services/carService.js');
const {
  createExtra,
  getExtras,
  modifyCarExtras,
} = require('../services/extraService.js');
const { parseError } = require('../utils/errorParser.js');

const router = require('express').Router();

router.get('/', hasRole('admin'), (req, res) => {
  res.render('createExtras', {
    title: 'Add Car Extras',
  });
});

router.post('/', hasRole('admin'), async (req, res) => {
  try {
    let icon = req.body.icon;
    if (!icon) {
      icon = 'dollar-sign.png';
    }

    await createExtra(req.body.title, icon);
    res.render('createExtras', {
      title: 'Add Car Extras',
      successMsg: 'saved',
    });
  } catch (err) {
    res.render('createExtras', {
      title: 'Add Car Extras Error',
      errors: parseError(err),
    });
  }
});

router.get('/:carId/car-extras', async (req, res) => {
  const carId = req.params.carId;
  const car = await getCarById(carId);

  if (!req.user || car.owner != req.user._id) {
    return res.redirect('/auth/login');
  }

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
    const car = await getCarById(carId);

    if (!req.user || car.owner != req.user._id) {
      return res.redirect('/auth/login');
    }

    await modifyCarExtras(carId, Object.keys(req.body));
    res.redirect('/edit/' + carId + '/car-extras');
  } catch (err) {
    res.render('editCarExtras', {
      title: 'Update Car Extras Error',
      errors: parseError(err),
    });
  }
});
module.exports = router;
