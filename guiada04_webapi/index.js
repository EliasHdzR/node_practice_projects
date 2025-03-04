const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");
const requestLogger = require("./middlewares/requestLogger");

const app = express();
const PORT = 3001;

/**
 * El orden en el que se creen los middleware es importante, ya que se ejecutan en el orden en el que se crean
 */

app.use(cors()); // Middleware que permite realizar llamadas ajax en otro dominio donde no se está ejecutando la api
app.use(express.json()); // Middleware para parsear el body de las peticiones

app.use((req, res, next) => {
  console.log("Middleware para autenticacion");
  req.username = "usuario_x"; // se puede agregar informacion al request para que se refleje en los siguientes middlewares
  next(); // para que siga con el siguiente middleware
});

app.use(requestLogger);

app.use((res, rest, next) => {
  try {
    next();
  } catch (err) {
    rest.status(500).json({message: "Error en la aplicacion"});
    console.log(err)
  }

  console.log("Este middleware se debería ejecutar al último")
});

app.get("/", (req, res) => {
  console.log("Ejecutando el handling del root de la app")
  res.send("Hola");
});


/**
 * Aqui empiezan los endpoints de la API
 */

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