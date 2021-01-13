module.exports = (error, req, res, next) => {
  res.status(500).send("Something happened");
};
