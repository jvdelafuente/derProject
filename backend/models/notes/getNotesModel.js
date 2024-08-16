const getDb = require("../../db/getDb");

// Función que se conectará a la base de datos y devolverá todos los note.
const getNotesModel = async (keyword = '', user_id = 0) => {
    let connection;

    try {
        connection = await getDb();

        const [notes] = await connection.query(
            `
                SELECT 
                    t.id,
                    t.text,
                    t.title,
                    t.image,
                    u.avatar,
                    t.user_id,
                    u.username,
                    t.user_id = ? AS owner,
                    COUNT(l.id) AS votes,
                    BIT_OR(l.user_id = ?) AS likedByMe,
                    t.created_at
                FROM post t
                INNER JOIN users u ON u.id = t.user_id
                LEFT JOIN upVotes l ON l.post_id = t.id
                WHERE u.username LIKE ? OR t.text LIKE ?
                GROUP BY t.id;
            `,
            [user_id, user_id, `%${keyword}%`, `%${keyword}%`]
        );

        return notes;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getNotesModel;