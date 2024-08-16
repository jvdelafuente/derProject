const getDb = require("../../db/getDb");
const { likeAlreadyExistsError } = require("../../services/errorService");

const insertVoteModel = async (post_id, user_id) => {
    let connection;

    try {
        connection = await getDb();

        // comprobamos si el usuario ya ha votado

        const [upVotes] = await connection.query(
            `SELECT id FROM upVotes WHERE post_id = ? AND user_id = ?`,
            [post_id, user_id]
        )

        if (upVotes.length > 0) {
            // hay que cambiarlo!!
            likeAlreadyExistsError()
        }
        
        await connection.query(
            `INSERT INTO upVotes(post_id, user_id) VALUES(?, ?)`,
            [post_id, user_id]
        )
    } finally {
        if (connection) connection.release()
    }
}

module.exports = insertVoteModel;