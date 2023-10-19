const { resource } = require("../resources/BarangResources");

exports.ROUTES = [
    {
      path: "/user",
      resource: "UserResources",
    },
    {
      path: "/product",
      resource: "ProductResources",
    },
    {
      path: "/barang",
      resource: "BarangResources",
    },
    {
      path: "/customers",
      resource: "CustomerResources",
    },
    {
      path: "/terima",
      resource: "/TerimaResources"
    },
    {
      path: "/picker",
      resource: "PickerResources",
    },

  ];

  exports.ORIGINS_CORS = [
    "http://localhost:3000",
  ]
  
  