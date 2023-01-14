const { logger } = require("../startup/logger");

module.exports = function (err, req, res, next) {
  // winston.log("error", err.message);
  res.status(500).send("Something went wrong. Please try again later.");
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
};
