const express = require("express");
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const { TerimaModel } = require("../models/TerimaModels");
const { CustomerModel } = require("../models/CustomerModels");
const app = express();

// /picker/
app.post("/", async (req, res) => {
  req.body.harga = req.body.berat * 10000;
  let oldCustomer = await CustomerModel.findOne({ hp: req.body.customer.hp });

  if (!oldCustomer) {
    const { customer } = req.body;
    await CustomerModel.create(customer);
  }

  // req.body.user = req.user.email;

  await TerimaModel.create(req.body);

  return res.status(201).json(req.body);
});

module.exports = app;