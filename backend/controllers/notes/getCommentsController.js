// controllers/comments/getCommentsController.js
const getCommentsModel = require('../../models/notes/getCommentsModel');

const getCommentsController = async (req, res, next) => {
    try {
        const { post_id } = req.params; // El ID del post se obtiene de los parámetros de la ruta

        if (!post_id) {
            return res.status(400).json({
                status: 'error',
                message: 'Post ID is required'
            });
        }

        const comments = await getCommentsModel(post_id);

        res.json({
            status: 'ok',
            data: {
                comments: comments.map(comment => ({
                    id: comment.id,
                    user_id: comment.user_id,
                    post_id: comment.post_id,
                    content: comment.content,
                    created_at: comment.created_at,
                    username: comment.username,
                    avatar: comment.avatar
                }))
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getCommentsController;
