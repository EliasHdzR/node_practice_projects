const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params; // es lo mismo que: const id = req.params.id, gracias a la destructuración
  const resObj = {
    id: id, // tambien podría ser solo 'id', ya que se llama igual
    nombre: `Elemento ${id}`,
    descripcion: `Descripción del elemento ${id}`
  };

  res.json(resObj);
});

router.post("/", (req, res) => {
  const reqObj = req.body;
  const resObj = {
    message: "Elemento guardado correctamente",
    data: reqObj
  };

  res.json(resObj);
});

module.exports = router; // para importar el componente