const mongoose = require("mongoose");

// definisikan model
exports.CustomerModel = mongoose.model(
  "Customer",
  new mongoose.Schema(
    {
      
		nama: { type: String, default: "" },
		hp: { type: String, default: "", unique: true },
		alamat: { type: String, default: "" },
    email: {type: String},
    verify: [
      {
        _id: false,
        token: { type: String },
        status: { type: Boolean, default: false },
      }
    ],
    }
  )
);
