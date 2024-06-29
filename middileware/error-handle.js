const errorHandel = (err, req, res, next) => {
  res.status(err.status || 500).json({ erorr: err.message });
  next();
};

module.exports = errorHandel;
