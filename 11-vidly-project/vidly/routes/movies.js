const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.body.genreId))
    return res
      .status(400)
      .send({ message: `Cannot update Genre with id=${req.body.genreId}!` });

  const genre = await Genre.findById(req.body.genreId);

  if (!genre)
    return res
      .status(400)
      .send({ message: `Cannot find given genreId= ${req.body.genreId}` });

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    await movie.save();
    res.send(movie);
  } catch (ex) {
    console.log(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreId = req.body.genreId;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(genreId))
    return res
      .status(400)
      .send({ message: `Cannot update Genre with id=${genreId}!` });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(400)
      .send({ message: `Cannot update Movie with path id=${id}!` });

  await Genre.findById(genreId)
    .then((data) => {
      if (!data)
        res
          .status(400)
          .send({ message: `Cannot find given genreId= ${genreId}` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Error finding genre with id: ${genreId}` })
    );

  await Movie.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movie with id=${id}!`,
        });
      } else res.send({ message: "Movie was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id,
      });
      console.log(err);
    });
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ message: `Cannot delete Movie with path id=${req.params.id}!` });

  await Movie.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${req.params.id}.`,
        });
      } else res.send({ message: "Movie was deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Movie with id=" + req.params.id,
      });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(400)
      .send({ message: `Cannot get Movie with path id=${id}!` });
  await Movie.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Movie with id=" + id,
      });
    });
});

module.exports = router;
