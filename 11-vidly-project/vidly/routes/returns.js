const express = require("express");
const { Rental } = require("../models/rental");
const router = express.Router();
const auth = require("../middleware/auth");
const { Movie } = require("../models/movie");
const Joi = require("joi");
const validate = require("../middleware/validate");

/* router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customer id not provided");
  if (!req.body.movieId) return res.status(400).send("movie id not provided");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("rental was not found");

  if (rental.dateReturned)
    return res.status(400).send("rental already processed.");

  rental.dateReturned = new Date();

  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateOne(
    {
      _id: rental.movie._id,
    },
    { $inc: { numberInStock: 1 } }
  );

  return res.status(200).send(rental);

  // res.status(401).send("Unauthorized");
}); */

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("rental was not found");

  if (rental.dateReturned)
    return res.status(400).send("rental already processed.");

  rental.return();
  await rental.save();

  await Movie.updateOne(
    {
      _id: rental.movie._id,
    },
    { $inc: { numberInStock: 1 } }
  );

  return res.send(rental);
});

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectid().required(),
    movieId: Joi.objectid().required(),
  });

  return schema.validate(req);
}

module.exports = router;
