const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/trycatch");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    // throw new Error("Could not get genres");
    const genres = await Genre.find().sort("name");
    res.send(genres);
  })
);

router.post("/", auth, async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  try {
    await genre.save();
    res.send(genre);
  } catch (ex) {
    // console.log(ex.message);
    // res.status(500).send("Something went wrong.");
    next(ex);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send(`Cannot update Genre with path id=${id}!`);

  await Genre.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send(`Cannot update Genre with id=${id}!`);
      } else res.send("Genre was updated successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error updating Genre with id=" + id);
    });
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Cannot delete Genre with path id=${req.params.id}!`);

  await Genre.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send(`Cannot delete Genre with id=${req.params.id}.`);
      } else res.send("Genre was deleted successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error deleting Genre with id=" + req.params.id);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send(`Cannot get Genre with id=${req.params.id}!`);
  await Genre.findById(id)
    .then((data) => {
      if (!data) res.status(404).send("Not found Genre with id " + id);
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send("Error retrieving Genre with id=" + id);
    });
});

module.exports = router;
