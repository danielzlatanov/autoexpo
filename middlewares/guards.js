function isUser() {
  return (req, res, next) => {
    if (req.user != undefined) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (req.user == undefined) {
      next();
    } else {
      res.redirect('/');
    }
  };
}

function hasRole(role) {
  return (req, res, next) => {
    if (req.user == undefined || !req.user.roles.includes(role)) {
      return res.render('noAdminRole');
    }
    next();
  };
}

module.exports = {
  isUser,
  isGuest,
  hasRole,
};
