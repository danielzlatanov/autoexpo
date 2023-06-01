module.exports = () => (req, res, next) => {
  if (req.user != undefined) {
    res.locals.username = req.user.username;
  }
  next();
};
