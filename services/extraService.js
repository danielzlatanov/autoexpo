const Extra = require('../models/Extra.js');

async function getExtras() {
  return Extra.find({});
}

async function createExtra(title, icon) {
  return Extra.create({
    title,
    icon,
  });
}

module.exports = {
  getExtras,
  createExtra
};
