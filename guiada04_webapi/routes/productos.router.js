const express = require("express");
const router = express.Router();

const productos = [
  {id: 1, nombre: "Producto 1", descripcion: "Descripción del producto 1"},
  {id: 2, nombre: "Producto 2", descripcion: "Descripción del producto 2"},
  {id: 3, nombre: "Producto 3", descripcion: "Descripción del producto 3"},
  {id: 4, nombre: "Producto 4", descripcion: "Descripción del producto 4"},
];

router.get("/", (req, res) => {
  const resObj = {
    message: "Lista de productos obtenida exitosamente",
    data: productos
  };

  res.json(resObj);
});

module.exports = router;