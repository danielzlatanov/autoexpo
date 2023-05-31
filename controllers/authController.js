const router = require('express').Router();
const { login, register } = require('../services/authService.js');

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Sign In',
  });
});

router.post('/login', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error('all fields are required');
    }
    
    const result = await login(
      req.body.username.trim(),
      req.body.password.trim()
    );
  
    attachJwt(req, res, result);
    res.redirect('/');
  } catch (err) {
    res.render('login', {
      title: 'Login Error',
      errors: err.message.split('\n'),
    });
  }
  
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Sign Up',
  });
});

router.post('/register', async (req, res) => {
  try {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const repass = req.body.repeat.trim();

    if (!username || !password) {
      throw new Error('all fields are required');
    }
    if (password != repass) {
      throw new Error("passwords don't match");
    }
    if (username.length < 3) {
      throw new Error('username must be at least 3 characters long');
    }

    const result = await register(username, password);

    attachJwt(req, res, result);
    res.redirect('/');
  } catch (err) {
    res.render('register', {
      title: 'Register Error',
      errors: err.message.split('\n'),
    });
  }
});

function attachJwt(req, res, data) {
  const token = req.signJwt(data);
  res.cookie('jwt', token, { maxAge: 14400000 });
}

module.exports = router;
