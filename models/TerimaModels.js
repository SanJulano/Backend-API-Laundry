const mongoose = require("mongoose");

// definisikan model
exports.TerimaModel = mongoose.model(
  "Terima",
  new mongoose.Schema(
    {
        tanggal: { type: Date, default: new Date() },
        customer: {
            _id: false,
            nama: { type: String, default: "" },
            hp: { type: String, default: "" },
            alamat: { type: String, default: "" }
        },
        berat: { type: Number, default: 0 },
        harga: { type: Number, default: 0 },
        status: { type: String, default: "dicuci" },
        details: [{
            _id: false,
            nama: { type: String }
        }],
        user: { type: String, default: "" }
    }
  )
);