const express = require("express");
const mysql = require("mysql2/promise");
const dbConfig = require("./dbConfig.json");
const tareasService = require("./services/TareasService");

const routerApi = require("./routes");
const app = express();
const PORT = 3001;

app.use(express.json()); // Middleware para parsear el body de las peticiones

app.get("/", (req, res) => {
  res.send("Hola");
});

// esto es un endpoint
app.get("/json", (req, res) => {
  const resObj = {
    id: 2345,
    nombre: "Nombre del Object",
    descripcion: "Descripcion del Object"
  }
  res.json(resObj);
});

app.get("/test-db", async (req, res) => {
  try {
    const db = await mysql.createConnection(dbConfig);
    res.send("Conexion a BD exitosa");
    await db.end()
  }
  catch (e) {
    console.error(e);
    res.status(500).send("Error de DB: " + e.message);
  }
});

app.get("/tareas", async (req, res) => {
  const tareasSvc = new tareasService();
  const tareas = await tareasSvc.obtenerTodas();
  res.json(tareas);
});

routerApi(app);

app.listen(PORT, () => {
  console.log("Aplicacion Express corriendo");
});