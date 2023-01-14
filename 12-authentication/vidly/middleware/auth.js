const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied! No token provided.");
  }

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedPayload;
    // console.log(decodedPayload);
    next();
  } catch (ex) {
    console.log(ex.message);
    res.status(400).send("Invalid token");
  }
};
