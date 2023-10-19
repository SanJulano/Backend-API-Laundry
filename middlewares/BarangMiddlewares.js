exports.BarangDetailMiddleware = (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    console.log(`HALO INI MIDDLEWARE`);
    next();
  };
  