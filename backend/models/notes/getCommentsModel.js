// models/comments/getCommentsModel.js
const getDb = require("../../db/getDb");

// Función que se conectará a la base de datos y devolverá todos los comentarios de un post específico.
const getCommentsModel = async (post_id) => {
    let connection;

    try {
        connection = await getDb();

        const [comments] = await connection.query(
            `
                SELECT 
                    c.id,
                    c.user_id,
                    c.post_id,
                    c.content,
                    c.created_at,
                    u.username,
                    u.avatar
                FROM comments c
                INNER JOIN users u ON u.id = c.user_id
                WHERE c.post_id = ?
                ORDER BY c.created_at DESC;
            `,
            [post_id]
        );

        return comments;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getCommentsModel;
