const express = require("express");
const mongoose = require("mongoose");
const { BarangModel } = require("../models/BarangModels");
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const app = express();

app.post("/", async (req, res) => {
    await BarangModel.create(req.body);
    return res.status(201).json(req.body);
  });
  
  app.get("", async (req, res) => {
    const barangs = await BarangModel.find();
    return res.status(200).json(barangs);
  });

  app.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ detail: "404 Resource not found" });
    }
  
    const barang = await BarangModel.findById(req.params.id, { __v: 0 });
    if (!barang) {
      return res.status(404).json({ detail: "404 Resource not found" });
    }
    return res.status(200).json(barang);
  });
  
  app.put("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ detail: "404 Resource not found" });
    }
  
    const result = await BarangModel.findOneAndUpdate(
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
    await BarangModel.findOneAndDelete({ _id: req.params.id });
  
    return res.status(204).json(null);
  });
  
  module.exports = app;