module.exports = (handler) => async (req, res, next) => {
  try {
    handler(req, res);
  } catch (error) {
    next(error);
  }
};
