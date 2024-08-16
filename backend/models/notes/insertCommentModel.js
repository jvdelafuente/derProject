const getDb = require('../../db/getDb');

const insertCommentModel = async (user_id, post_id, content) => {
    let connection;

    try {
        connection = await getDb();

        // Insertamos el comentario en la base de datos
        const [result] = await connection.query(
            `INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)`,
            [user_id, post_id, content]
        );

        // Retornamos el id del comentario que acabamos de crear
        return result.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertCommentModel;