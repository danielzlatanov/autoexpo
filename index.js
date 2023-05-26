const port = 3000;
const express = require('express');
const expressConfig = require('./config/expressConfig.js');
const routerConfig = require('./config/routerConfig.js');
const databaseConfig = require('./config/databaseConfig.js');

start();
async function start() {
  const app = express();

  await databaseConfig(app);
  expressConfig(app);
  routerConfig(app);

  app.listen(port, () =>
    console.log('server listening on port ' + port + '...')
  );
}
