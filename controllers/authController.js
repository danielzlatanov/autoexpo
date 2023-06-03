const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const { login, register } = require('../services/authService.js');
const { parseError } = require('../utils/errorParser.js');

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Sign In',
  });
});

router.post(
  '/login',
  body(['username', 'password']).trim(),
  async (req, res) => {
    try {
      const result = await login(req.body.username, req.body.password);
      attachJwt(req, res, result);
      res.redirect('/');
    } catch (error) {
      res.render('login', {
        title: 'Login Error',
        body: { username: req.body.username },
        errors: parseError(error),
      });
    }
  }
);

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Sign Up',
  });
});

router.post(
  '/register',
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .bail()
    .isAlphanumeric()
    .withMessage('username may contain only alphanumeric characters'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('repeat')
    .trim()
    .custom(async (value, { req }) => {
      if (value != req.body.password) {
        throw new Error('passwords do not match');
      }
    }),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw errors;
      }

      const result = await register(req.body.username, req.body.password);

      attachJwt(req, res, result);
      res.redirect('/');
    } catch (error) {
      res.render('register', {
        title: 'Register Error',
        body: { username: req.body.username },
        errors: parseError(error),
      });
    }
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.redirect('/');
});

function attachJwt(req, res, data) {
  const token = req.signJwt(data);
  res.cookie('jwt', token, { maxAge: 14400000 });
}

module.exports = router;
