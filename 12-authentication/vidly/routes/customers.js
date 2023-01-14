const express = require("express");
const router = express.Router();
const { Customers, validate } = require("../models/customer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const customers = await Customers.find();
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customers({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  try {
    await customer.save();
    res.send(customer);
  } catch (ex) {
    console.log(ex.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Cannot update Customer with path id=${req.params.id}!`);

  await Customers.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(`Cannot update Customers with id=${req.params.id}!`);
      } else res.send("Customers was updated successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error updating Customers with id=" + req.params.id);
    });
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Cannot delete Customer with path id=${req.params.id}!`);

  await Customers.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(`Cannot delete Customer with id=${req.params.id}.`);
      } else res.send("Customer was deleted successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error deleting Customer with id=" + req.params.id);
    });
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Cannot get Customer with path id=${req.params.id}!`);

  await Customers.findById(req.params.id)
    .then((data) => {
      if (!data)
        res.status(404).send("Not found Customer with id " + req.params.id);
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send("Error retrieving Customer with id=" + req.params.id);
    });
});

module.exports = router;
