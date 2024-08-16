const getDb = require("../../db/getDb");
const { notFoundError } = require("../../services/errorService");

const deleteVotesModel = async (post_id, user_id) => {
    let connection;

    try {
        connection= await getDb();

        // funcion que se conectara a la base de datos y eliminara un nuevo voto
        const [upVotes] = await connection.query(
            `SELECT id FROM upVotes WHERE post_id = ? AND user_id = ?`,
            [post_id, user_id]
        )

        if (upVotes.length < 1) {
            // hay que cambiarlo!!
            notFoundError('upVotes')
        }
        
        await connection.query(
            `DELETE FROM upVotes WHERE post_id = ? AND user_id = ?`,
            [post_id, user_id]
        )
    } finally {
        if (connection) connection.release()
    }
}

module.exports = deleteVotesModel;