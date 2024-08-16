const getDB = require('../../db/getDb');
const bcrypt = require('bcrypt');

async function getUserById(user_id) {
  const connection = await getDB();
  try {
    const [userData] = await connection.query('SELECT * FROM users WHERE id = ?', [user_id]);
    return userData[0];
  } finally {
    connection.release();
  }
}

async function updateProfileModel(user_id, updatedData) {
  const connection = await getDB();
  try {
        if (updatedData.password) {
      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      // Actualizar el perfil del usuario con la nueva contraseña encriptada
    await connection.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',  [ 
      updatedData.username, 
      updatedData.email, 
      hashedPassword, 
      user_id, 
    ]); 
    } else {
      // Si no se proporcionó una nueva contraseña, actualizar el perfil sin modificar la contraseña
      await connection.query(
        'UPDATE users SET username = ?, email = ? WHERE id = ?',
        [updatedData.username, updatedData.email, user_id]
      );
    }
  } finally {
    connection.release();
  }
}

module.exports = { getUserById, updateProfileModel };