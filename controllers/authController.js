const router = require('express').Router();
const jwt = require('jsonwebtoken');

const jwtSecret = 'super-secret-stuff-qwerty-010010';

router.get('/obtain', (req, res) => {
  const payload = {
    _id: '02902ao0dsasox',
    username: 'daniel',
    roles: ['user'],
  };
  const token = jwt.sign(payload, jwtSecret);
  res.cookie('jwt', token);
  res.send('token obtained');
});

router.get('/validate', (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const data = jwt.verify(token, jwtSecret);
      res.json(data);
    } catch (err) {
      res.clearCookie('jwt');
      res.redirect('/auth/login');
    }
  } else {
    res.send('missing token');
  }
});

module.exports = router;
