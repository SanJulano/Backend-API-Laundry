const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModels");


// endpoint proses signup
app.post("/signup", async (req, res) => {
  //ambil data dari body
  //cek data apakah user sudah ada didalam database
  const oldUser = await UserModel.findOne({email: req.body.email});

  if(oldUser) {
    return res.
    status(400)
    .json({detail: "Email sudah terdaftar, silahkan signin"})
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  await UserModel.create(req.body);

  return res.status(201).json({detail: "Pendaftaran berhasil"});
})

// endpoint proses signin
app.post("/signin", async (req, res) => {
  console.log(req.body);
  const user = await UserModel.findOne({email: req.body.email});
  if (!user) {
    return res.status(401).json({detail: "User belum terdaftar."});

  }
   

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);

  if(!isValidPassword) {
    return res
    .status(401)
    .json({detail: "Password tidak valid/ tidak sama."});
  }


  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.TOKEN,
    { expiresIn: "1h" }
    
    );

    return res.status(200).json({ token });
  });




// app.get("/", (req, res) => {
//   res.send("Ini teh dari UserListController");
// });

// app.get("/:nomor/:username", (req, res) => {
//   res.send(
//     `Ini adalah parameter ID: ${req.params.nomor} dan username: ${req.params.username}`
//   );
// });

module.exports = app;
