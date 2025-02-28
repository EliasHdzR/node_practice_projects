const db = require("../dataAccess/db");

class TareasService {
  constructor() { }

  async obtenerTodas() {
    const [rows] = await db.execute("SELECT * FROM tareas");
    return rows.map(r => { return {
      id: r.id,
      descripcion: r.descripcion,
      fechaRegistro: r.fecha_registro.toLocaleString("es-MX"),
      fechaCaduca: r.fecha_caduca?.toLocaleString("es-MX"), // el ? significa que si es null, no se ejecuta lo que sigue
      concluido: r.concluido != 0
    } });
  }

  async guardarNueva(tarea) {
    const sql =
      "INSERT INTO tareas (descripcion, fecha_registro, fecha_caduca, concluido) VALUES (?, ?, ?, ?)";

    const p = [tarea.descripcion, tarea.fechaRegistro, tarea.fechaCaduca, 0];
    const [r] = await db.execute(sql, p);
    return r.insertId;
  }
}

module.exports = TareasService;