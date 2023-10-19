const express = require("express");
const mongoose = require("mongoose");
const { ProductModel } = require("../models/ProductModels");
const IsAuthenticated = require("../middlewares/IsAuthenticated");

const app = express();

app.post("/", async (req, res) => {
  await ProductModel.create(req.body);
  return res.status(201).json(req.body);
});

app.get("", [IsAuthenticated], async (req, res) => {
  const products = await ProductModel.find();
  return res.status(200).json(products);
});

app.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }

  const product = await ProductModel.findById(req.params.id, { __v: 0 });
  if (!product) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }
  return res.status(200).json(product);
});

app.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }

  const result = await ProductModel.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );

  return res.status(200).json(result);
});

app.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }
  await ProductModel.findOneAndDelete({ _id: req.params.id });

  return res.status(204).json(null);
});

module.exports = app;
