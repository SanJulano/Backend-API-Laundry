const express = require("express");
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const { TerimaModel } = require("../models/TerimaModels");
const { CustomerModel } = require("../models/CustomerModels");

const app = express();

app.post("/", [IsAuthenticated], async (req, res) => {
  req.body.harga = req.body.berat * 10000;
  let oldCustomer = await CustomerModel.findOne({ hp: req.body.customer.hp });

  if (!oldCustomer) {
    const { customer } = req.body;
    await CustomerModel.create(customer);
  }

  req.body.user = req.user.email;

  await TerimaModel.create(req.body);

  return res.status(201).json(req.body);
});


//tambah disini
app.get("/", [IsAuthenticated], async (req, res) => {
  const daftarTerima = await TerimaModel.find({ ...req.query });
  return res.status(200).json(daftarTerima);
});

app.get("/:id", [IsAuthenticated], async (req, res) => {
  const terima = await TerimaModel.findOne({ _id: req.params.id });
  return res.status(200).json(terima);
});

app.put("/:id/dicuci", [IsAuthenticated], async (req, res) => {
  console.log("ulalala");
  const terima = await TerimaModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "dicuci" },
    { new: true }
  );

  return res.status(200).json(terima);
});



app.put("/:id/selesai", [IsAuthenticated], async (req, res) => {
  const terima = await TerimaModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "selesai" },
    { new: true }
  );

  return res.status(200).json(terima);
});

app.put("/:id/ambil", [IsAuthenticated], async (req, res) => {
  const terima = await TerimaModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "ambil" },
    { new: true }
  );

  return res.status(200).json(terima);
});

app.get("/:hp/cek-cucian", async (req, res) => {
  const daftarTerima = await TerimaModel.find({
    "customer.hp": req.params.hp,
    status: { $ne: "ambil" },
  });
  return res.status(200).json(daftarTerima);
});



module.exports = app;
