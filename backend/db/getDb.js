const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = process.env;
let pool;

const getDb = async () => {
  try {
    if (!pool) {
      // Crear la conexión inicial para verificar la base de datos
      const connection = await mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        port: MYSQL_PORT,
        timezone: 'Z',
      });

      // Crear la base de datos si no existe
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

      // Crear el pool de conexiones
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        port: MYSQL_PORT,
        timezone: 'Z',
      });
    }

    // Retornar una conexión desde el pool
    return await pool.getConnection();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Asegúrate de propagar el error para que puedas manejarlo adecuadamente
  }
};

module.exports = getDb;
