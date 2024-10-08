// Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../db/getDb');

// Importamos las funciones de error.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que se conectará a la base de datos y comprobará
// si existe un note con el id que obtenemos por path params.
const notesExistController = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        const { post_id } = req.params;

        const [notes] = await connection.query(
            `SELECT id FROM post WHERE id = ?`,
            [post_id]
        );

        if (notes.length < 1) {
            notFoundError('notes');
        }

        // Pasamos el control al siguiente middleware.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = notesExistController
