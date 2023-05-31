const router = require('express').Router();
const { login, register } = require('../services/authService.js');

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Sign In',
  });
});

router.post('/login', async (req, res) => {
  const result = await login(req.body.username, req.body.password);
  attachJwt(req,res,result);
  res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Sign Up',
  });
});

router.post('/register', async (req, res) => {
  const result = await register(req.body.username, req.body.password);
  attachJwt(req,res,result);
  res.redirect('/');
});

function attachJwt(req, res, data) {
  const token = req.signJwt(data);
  res.cookie('jwt', token, { maxAge: 14400000 });
}

module.exports = router;
