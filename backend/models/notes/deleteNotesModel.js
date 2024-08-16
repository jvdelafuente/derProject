// Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../../db/getDb');

// Importamos las funciones de error.
const { unauthorizedUserError } = require('../../services/errorService');

// Función que se conectará a la base de datos y eliminará un note.
const deleteNotesModel = async (post_id, user_id) => {
    let connection;

    try {
        connection = await getDb();

        const [notes] = await connection.query(
            `SELECT user_id FROM post WHERE id = ?`,
            [post_id]
        );

        // Si no somos los dueños del note lanzamos un error.
        if (notes[0].user_id !== user_id) {
            unauthorizedUserError();
        }

        // Eliminamos los likes del note antes de borrar al note, de lo contrario SQL
        // no nos dejará eliminar el note.
        await connection.query(`DELETE FROM upVotes WHERE post_id = ?`, [
            post_id,
        ]);

        // Eliminamos el note.
        await connection.query(`DELETE FROM post WHERE id = ?`, [post_id]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteNotesModel;
