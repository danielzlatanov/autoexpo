const defaultController = require('../controllers/defaultController.js');
const homeController = require('../controllers/homeController.js');
const catalogController = require('../controllers/catalogController.js');
const createController = require('../controllers/createController.js');
const extraController = require('../controllers/extraController.js');
const authController = require('../controllers/authController.js');

module.exports = (app) => {
  app.use(homeController);
  app.use('/catalog', catalogController);
  app.use('/create/car', createController);
  app.use('/create/car-extras', extraController);
  app.use('/edit', extraController);
  app.use('/auth', authController)

  app.all('*', defaultController);
};
