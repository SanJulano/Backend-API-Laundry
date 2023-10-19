const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("halooooo")
  if (!token) {
    return res.status(403).json({
      detail: "Token dibutuhkan untuk otentikasi",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      detail: "Token tidak valid.",
    });
  }
  return next();
};
