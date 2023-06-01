const defaultController = require('../controllers/defaultController.js');
const homeController = require('../controllers/homeController.js');
const catalogController = require('../controllers/catalogController.js');
const createController = require('../controllers/createController.js');
const extraController = require('../controllers/extraController.js');
const authController = require('../controllers/authController.js');
const carController = require('../controllers/carController.js');
const { isUser } = require('../middlewares/guards.js');

module.exports = (app) => {
  app.use(homeController);
  app.use('/catalog', catalogController);
  app.use('/create/car', isUser(), createController);
  app.use('/create/car-extras', isUser(), extraController);
  app.use('/edit', isUser(), extraController);
  app.use('/auth', authController);
  app.use('/car', carController)

  app.all('*', defaultController);
};
