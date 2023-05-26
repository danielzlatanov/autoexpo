const { createExtra } = require('../services/extraService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('createExtra', {
    title: 'Add Car Extra',
  });
});

router.post('/', async (req, res) => {
  try {
    await createExtra(req.body.title, req.body.icon);
    res.redirect('/create/car-extra');
  } catch (err) {
    res.render('createExtra', {
      title: 'An Error Occurred',
    });
  }
});

module.exports = router;
