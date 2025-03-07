const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");
const requestLogger = require("./middlewares/requestLogger");
const auth = require("./middlewares/auth");

const app = express();
const PORT = 3001;

/**
 * Existen diferentes tipos de autenticacion (Auth)
 *     Básica: Se envía el user y el password en cada petición. No es muy seguro y es poco configurable. El header que se tiene que modificar
 *        es el Authorization usando el formato Basic user:password en base64, después se lee ese header en el handling de la petición
 *     Token:
 *          JWT (Json Web Token): También se utiliza el header de Authorization pero se usa el formato Bearer con el token en base64, que
 *          corresponde a un texto que contiene la información del usuario y tiene un  hash con el que se puede validar, también maneja
 *          un parámetro de expiración. Se envía el password una sola vez y se obtiene un token que se envía en cada petición, así como
 *          un refresh token que se usa para obtener un nuevo token para así no iniciar sesión cuando expira el token.
 *
 *          OAuth: Es un estándar en el que dependemos de un tercero confiable para manejar nuestra autenticación, como Google, Facebook, etc.
 *      API Key: Se usa cuando el usuario no es el que va a usar estos endpoints, como para APIs públicas. A veces se puede combinar con
 *      una secret key. Se usa el formato de header X-API-KEY con el valor de la API Key en cualquier formato o usandolo como parámetro en url (?api-key=).
 *
 */

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
app.use("/api/v1/elementos", auth);
app.use("/api/v1/productos", auth);
app.use("/api/v1/tareas", auth);
app.use("/json", auth);

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