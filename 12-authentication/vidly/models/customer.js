const mongoose = require("mongoose");
const Joi = require("joi");

const Customers = mongoose.model(
  "Customers",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
  })
);

function validateCustomer(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(10).max(10).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Customers: Customers,
  validate: validateCustomer,
};
