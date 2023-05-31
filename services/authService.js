async function login(username, password) {
  return new Promise((resolve, reject) => {
    if (username.toLowerCase() === 'daniel' && password === '123') {
      resolve({
        _id: '02902ao0dsasox',
        username: 'daniel',
        roles: ['user'],
      });
    } else {
      reject(new Error('Invalid username or password'));
    }
  });
}

module.exports = {
  login,
};
