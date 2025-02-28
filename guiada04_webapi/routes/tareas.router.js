const express = require('express');
const TareasService = require('../services/TareasService');

const router = express.Router();
const tareasService = new TareasService();

router.get("/", async (req, res) => {
  const tareas = await tareasService.obtenerTodas();
  res.json(tareas);
});

router.post("/", async (req, res) => {
  const tarea = req.body;
  // TODO: Validar datos de la tareaj
  const idTarea = await tareasService.guardarNueva(tarea);

  // siempre hay que enviar una respuesta porque si no se queda colgado
  res.status(201).json({message: "Tarea creada exitosamente", idTarea});
});

module.exports = router;