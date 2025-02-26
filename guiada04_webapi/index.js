const express = require("express");

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

routerApi(app);

app.listen(PORT, () => {
  console.log("Aplicacion Express corriendo");
});