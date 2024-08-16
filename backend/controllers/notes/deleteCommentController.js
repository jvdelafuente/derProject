// controllers/comments/deleteCommentController.js
const unauthorizedUserError = require('../../services/errorService');
const deleteCommentModel = require('../../models/notes/deleteCommentModel');

const deleteCommentController = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const user_id = req.user.id;
        const commentUserId = req.commentUserId;

        if (commentUserId !== user_id) {
            return unauthorizedUserError();
        }

        await deleteCommentModel(comment_id, user_id);
        res.send({
            status: 'ok',
            message: 'Comentario eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteCommentController;
