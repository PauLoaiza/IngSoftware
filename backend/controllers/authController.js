const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importa la conexión a MySQL

// Registro de usuario
const register = (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  // Encriptar la contraseña
  bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error al encriptar la contraseña" });

    const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
    db.query(sql, [nombre, correo, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al registrar usuario", details: err });
      }
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    });
  });
};

// Login de usuario
const login = (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  const sql = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(sql, [correo], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos", details: err });

    if (results.length === 0) return res.status(401).json({ message: "Usuario no encontrado" });

    const usuario = results[0];

    bcrypt.compare(contrasena, usuario.contrasena, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Error al verificar la contraseña" });
      if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

      const token = jwt.sign({ id: usuario.id }, 'secret_key', { expiresIn: '1h' });
      res.json({ token, message: "Inicio de sesión exitoso" });
    });
  });
};

module.exports = { register, login };