// Importamos la función que nos permite obtener una conexión a a base de datos.
const getDb = require('../../db/getDb');

// Importamos las funciones de error.
const { notFoundError } = require('../../services/errorService');


const selectUserById = async (user_id) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos el usuario con el id dado.
        const [users] = await connection.query(
          `SELECT id, username, email, avatar, role, created_at FROM users WHERE id = ?`,
          [user_id]
        );

        if (users.length < 1) {
          notFoundError('users');
        }

    // Dado que no puede existir más de un usuario con un email determinado, en caso de que el array de usuarios haya algún usuario este estará en la posición 0.
    return users[0];
} finally {
    if (connection) connection.release();
    }
};

module.exports = selectUserById;