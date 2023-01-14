const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const users = await User.findOne({ email: req.body.email });
  if (users) return res.status(400).send("User already registered!");

  /* const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }); */

  const user = new User(
    _.pick(req.body, ["name", "email", "password", "isAdmin"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
    // res.send({ name: user.name, email: user.email });
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["name", "email"]));
  } catch (ex) {
    console.log(ex.message);
  }
});

module.exports = router;