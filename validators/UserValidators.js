const { param, body } = require("express-validator");
const { default: mongoose } = require("mongoose");

exports.ValidateParamID = () => {
  return param("id")
    .notEmpty()
    .withMessage("ID harus ada.")
    .bail()
    .custom((value, { req }) => {
      console.log(value, "test");
      return mongoose.Types.ObjectId.isValid(req.params.id);
    })
    .withMessage("Nilai ID tidak valid")
    .bail()
    .custom(async (value) => {
      const customer = await CustomerModel.findById(value);
      if (!customer) {
        throw new Error("Customer tidak ada.");
      }
    });
};

exports.ValidateCustomerCreate = () => {
  return [
    body("nama")
      .notEmpty()
      .withMessage("Nama wajib diisi")
      .isLength({ min: 5 })
      .withMessage("Nama minimum 5 karakter"),
    body("hp").notEmpty().withMessage("HP harus di isi"),
    body("alamat").notEmpty().withMessage("Alamat tidak boleh kosong"),
  ];
};

exports.ValidateCustomerUpdate = () => {
  return [
    body("nama")
      .notEmpty()
      .withMessage("Nama wajib diisi")
      .isLength({ min: 5, max: 20 })
      .withMessage("Nama minimum 5 karakter"),
    body("hp").optional().isLength({ min: 16 }).withMessage("HP harus di isi"),
    body("alamat")
      .optional()
      .notEmpty()
      .withMessage("Alamat tidak boleh kosong"),
  ];
};
