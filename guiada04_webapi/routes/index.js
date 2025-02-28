const express = require("express");
const elementosRouter = require("./elementos.router");
const productosRouter = require("./productos.router");
const tareasRouter = require("./tareas.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1/", router);
  router.use("/elementos", elementosRouter);
  router.use("/productos", productosRouter);
  router.use("/tareas", tareasRouter);
}

module.exports = routerApi;