exports.errorMiddleware = (req, res, next) => {
  next(new Error('Something broke!'));
};
