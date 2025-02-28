const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");
const app = express();
const PORT = 3001;

app.use(cors());
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

routerApi(app);

app.listen(PORT, () => {
  console.log("Aplicacion Express corriendo");
});