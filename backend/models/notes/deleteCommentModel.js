// models/comments/deleteCommentModel.js

const getDb = require('../../db/getDb');
const { unauthorizedUserError } = require('../../services/errorService');

const deleteCommentModel = async (comment_id, user_id) => {
    let connection;

    try {
        connection = await getDb();

        // Verificar si el comentario existe y si el usuario es el autor
        const [comments] = await connection.query(
            `SELECT user_id FROM comments WHERE id = ?`,
            [comment_id]
        );

        if (comments.length === 0) {
            throw new Error('Comentario no encontrado');
        }

        if (comments[0].user_id !== user_id) {
            unauthorizedUserError();
        }

        // Eliminar el comentario
        await connection.query(`DELETE FROM comments WHERE id = ?`, [comment_id]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteCommentModel;
