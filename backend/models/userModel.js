const db = require('../config/db');

const createUser = (nombre, correo, contrasena, callback) => {
  const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
  db.query(sql, [nombre, correo, contrasena], callback);
};

const getUserByEmail = (correo, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(sql, [correo], callback);
};

module.exports = { createUser, getUserByEmail };