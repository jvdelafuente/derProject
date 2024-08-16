// Importamos la función que nos permite obtener una conexión a a base de datos.
const getDb = require('../../db/getDb');

// Funcion que conecta con la DDBB y actualiza el avatar
const updateAvatarModel = async (avatarName, user_id) => {
  let connection;
  
  try {
    connection = await getDb();

    await connection.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
      avatarName,
      user_id
    ]);
  } finally  {
    if (connection) connection.release();
  }
};

module.exports = updateAvatarModel;