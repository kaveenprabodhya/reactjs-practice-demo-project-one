const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movies = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMovies(data) {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(data);
}

module.exports = {
  Movie: Movies,
  validate: validateMovies,
};
