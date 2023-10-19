const mongoose = require("mongoose");

// definisikan model
exports.BarangModel = mongoose.model(
  "Barang",
  new mongoose.Schema(
    {
        nama: { type: String },

    }
  )
);