// middlewares/commentsExistController.js

const getDb = require('../db/getDb');
const { notFoundError } = require('../services/errorService');

const commentsExistController = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();
        const { comment_id } = req.params;
        const [comments] = await connection.query('SELECT user_id FROM comments WHERE id = ?', [comment_id]);

        if (comments.length === 0) {
            return notFoundError('Comentario no encontrado');
        }

        // Store the comment's user_id in request object for later use
        req.commentUserId = comments[0].user_id;

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = commentsExistController;
