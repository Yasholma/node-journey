// logger middleware
function logMiddleware(req, res, next) {
  console.log("Logging");
  next();
}

module.exports.logMiddleware = logMiddleware;
