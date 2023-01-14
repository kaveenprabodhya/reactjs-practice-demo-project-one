const mongoose = require("mongoose");
const { logger } = require("./logger");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      // console.log("Connected to MongoDB...");
      logger.info(`Connected to ${db} - ${new Date()}`);
    })
    .catch((err) => console.log(`Could not connect to ${db}`, err));
};
