const { transport } = require("../config/email");

exports.createEmailToken = () => `${Math.floor(Math.random() * 1000000)}`;

exports.sendTokenVerify = (email, token) => {
  let mailOptions = {
    from: "admin@andreas.com",
    to: `${email}`,
    subject: "Token Verify",
    text: token,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // return res.status(400).json({ detail: "Token gagal dikirim" });
    } else {
      console.log(info.response);
      // return res.status(200).json(customer);
    }
  });
};
