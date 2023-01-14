const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customers } = require("../models/customer");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findById(req.body.customerId).catch((err) =>
    res.status(500).send({
      message: `Error finding Customer with id: ${req.body.customerId}`,
    })
  );

  if (!customer)
    return res.status(400).send({
      message: `Cannot find Customer with given id= ${req.body.customerId}`,
    });

  const movie = await Movie.findById(req.body.movieId);

  if (!movie)
    return res.status(400).send({
      message: `Cannot find Movie with given id= ${req.body.movieId}`,
    });

  if (movie.numberInStock === 0)
    return res.status(400).send({ message: "Movie not in stock" });

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
  } catch (ex) {
    console.log(ex.message);
  }
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ message: `Cannot delete Rental with id=${req.params.id}!` });

  await Rental.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Rental with id=${req.params.id}.`,
        });
      } else res.send({ message: "Rental was deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Rental with id=" + req.params.id,
      });
    });
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ message: `Cannot get Rental with id=${req.params.id}!` });
  await Rental.findById(req.params.id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Rental with id " + req.params.id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Rental with id=" + req.params.id,
      });
    });
});

module.exports = router;
