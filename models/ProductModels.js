const mongoose = require("mongoose");

// definisikan model
exports.ProductModel = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    location: { type: String, default: "" },
  })
);
