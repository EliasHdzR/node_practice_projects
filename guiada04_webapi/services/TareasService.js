const mysql = require("mysql2/promise");
const dbConfig = require("../dbConfig.json");

class TareasService {
  constructor() { }

  async obtenerTodas() {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute("SELECT * FROM tareas");

    await db.end();
    return rows;
  }
}

module.exports = TareasService;