const express = require("express");
const elementosRouter = require("./elementos.router");
const productosRouter = require("./productos.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1/", router);
  router.use("/elementos", elementosRouter);
  router.use("/productos", productosRouter);
}

module.exports = routerApi;