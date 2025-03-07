const express = require('express');
const bcrypt = require("bcrypt");
const AccountsService = require('../services/AccountsService');

const router = express.Router();
const accountsService = new AccountsService();

router.post("/new-user", async (req, res) => {
	const nuevo_usuario = req.body;

	if(!nuevo_usuario.username || !nuevo_usuario.password || !nuevo_usuario.nombre) {
		res.status(400).json({message: "Faltan datos obligatorios."});
		return;
	}

	const existe = await accountsService.obtenerCuenta(nuevo_usuario.username);
	if (existe) {
		res.status(409).json({message: "El usuario ya existe."});
		return;
	}

	const salt_rounds = 12;
	nuevo_usuario.hash = await bcrypt.hash(nuevo_usuario.password, salt_rounds);

	try {
		const id_nuevo_usuario = await accountsService.crearCuenta(nuevo_usuario);
		res.status(201).json({message: "Usuario creado exitosamente", id_nuevo_usuario});
	} catch (Error) {
		res.status(500).json({message: `Error al crear usuario: ${Error}`});
	}

});

module.exports = router;