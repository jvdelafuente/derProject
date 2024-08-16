// Importamos la función que nos permite obtener una conexión con la BDD
const getDb = require('../../db/getDb');

// Función que se conectará a la BDD
const insertNotesModel = async (title, text, image, user_id) => {
    let connection;

    try {
        connection = await getDb();

        // Creamos notes en la base de datos y obtenemos información sobre su id.
        const [result] = await connection.query(
            `INSERT INTO post (title, text, image, user_id) VALUES (?, ?, ?, ?)`,
            [title, text, image || null, user_id || null]
        );

        // Retornamos el id de la nota (note) que acabamos de crear.
        return result.insertId;

    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNotesModel;
