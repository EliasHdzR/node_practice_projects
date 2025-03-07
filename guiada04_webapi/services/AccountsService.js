const db = require("../dataAccess/db");

class AccountsService {
	constructor() {
	}

	async obtenerCuenta(username) {
		const sql = "SELECT username FROM usuarios WHERE username = ?";
		const p = [username];
		const [r] = await db.execute(sql, p);

		return r[0];
	}

	async crearCuenta(usuario) {
		let sql;
		let p;

		if (usuario.apellidos) {
			sql = "INSERT INTO usuarios (username, password, nombre, apellidos, tipo_usuario, activo) VALUES (?, ?, ?, ?, 'user', 1)";
			p = [usuario.username, usuario.hash, usuario.nombre, usuario.apellidos];
		} else {
			sql = "INSERT INTO usuarios (username, password, nombre, tipo_usuario, activo) VALUES (?, ?, ?, 'user', 1)";
			p = [usuario.username, usuario.hash, usuario.nombre];
		}

		const [r] = await db.execute(sql, p);
		return r.insertId;
	}
}

module.exports = AccountsService;