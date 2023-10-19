const express = require("express");
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const { CustomerModel } = require("../models/CustomerModels");
const { default: mongoose } = require("mongoose");
const { body, validationResult, param } = require("express-validator");
const {
  ValidateParamID,
  ValidateCustomerCreate,
  ValidateCustomerUpdate,
} = require("../validators/CustomerValidators");
const { RunValidation } = require("../validators/CommonValidators");
const { transport } = require("../config/email");
const { createEmailToken, sendTokenVerify } = require("../utils/EmailUtils");

const app = express();

app.get("/", [IsAuthenticated], async (req, res) => {
  let customers = [];
  if (req.query.nama) {
    customers = await CustomerModel.find({
      nama: { $regex: `.*${req.query.nama}.*`, $options: "i" },
    });
  } else {
    customers = await CustomerModel.find();
  }

  return res.status(200).json(customers);
});

app.post(
  "/",
  [IsAuthenticated, ...ValidateCustomerCreate(), RunValidation()],
  async (req, res) => {
    await CustomerModel.create(req.body);
    return res.status(201).json(req.body);
  }
);

app.get(
  "/:id",
  [IsAuthenticated, ValidateParamID(), RunValidation()],
  async (req, res) => {
    const customer = await CustomerModel.findById(req.params.id);
    return res.status(200).json(customer);
  }
);

app.put(
  "/:id",
  [
    IsAuthenticated,
    ValidateParamID(),
    ...ValidateCustomerUpdate(),
    RunValidation(),
  ],
  async (req, res) => {
    const customer = await CustomerModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json(customer);
  }
);

app.delete(
  "/:id",
  [IsAuthenticated, ValidateParamID(), RunValidation()],
  async (req, res) => {
    await CustomerModel.findByIdAndDelete(req.params.id);
    return res.status(204).json(null);
  }
);

app.get("/:hp/check-customer", async (req, res) => {
  const customer = await CustomerModel.findOne({ hp: req.params.hp });

  if (!customer) {
    return res.status(404).json({ detail: "Anda belum menjadi membership" });
  }

  return res.status(200).json(customer);
});

app.post("/:hp/send-token", async (req, res) => {
  const token = createEmailToken();
  let email = req.body.email;

  let customer = await CustomerModel.findOne({ hp: req.params.hp });

  if (!customer) {
    return res.status(404).json({ detail: "Anda belum menjadi membership" });
  }

  if (customer.email) {
    email = customer.email;
    sendTokenVerify(customer.email, token);
  }

  let currentVerify = customer.verify;
  currentVerify.push({
    token,
  });

  customer = await CustomerModel.findOneAndUpdate(
    { hp: req.params.hp },
    { email, verify: currentVerify },
    { new: true }
  );

  return res.status(200).json(customer);
});

app.post("/:hp/verify-token", async (req, res) => {
  const token = req.body.token;
  let customer = await CustomerModel.findOne({ hp: req.params.hp });

  if (!customer) {
    return res.status(404).json({ detail: "Anda belum menjadi membership" });
  }

  let currentVerify = customer.verify;

  const tokenIsExist = currentVerify.some((value) => value.token === token);

  if (!tokenIsExist) {
    return res.status(404).json({ detail: "Token tidak ditemukan." });
  }

  return res.status(200).json({ detail: "Token valid" });
});

// app.get("/:hp/create-token", async (req, res) => {

// })
module.exports = app;

