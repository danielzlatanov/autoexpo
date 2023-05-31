const bcrypt = require('bcrypt');
const User = require('../models/User.js');

async function register(username, password) {
  const existing = await User.findOne({
    username: { $regex: new RegExp(username), $options: 'i' },
  });
  if (existing) {
    throw new Error('username is taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    hashedPassword,
  });

  return {
    username,
    roles: user.roles,
  };
}

async function login(username, password) {
  return new Promise((resolve, reject) => {
    if (username.toLowerCase() === 'daniel' && password === '123') {
      resolve({
        _id: '02902ao0dsasox',
        username: 'daniel',
        roles: ['user'],
      });
    } else {
      reject(new Error('invalid username or password'));
    }
  });
}

module.exports = {
  register,
  login,
};
