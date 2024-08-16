const insertCommentModel = require('../../models/notes/insertCommentModel');
const validateSchema = require('../../utils/validateSchema');
const newCommentSchema = require('../../schemas/notes/newCommentSchema');

const newCommentController = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { content } = req.body;


        // Validamos los datos del cuerpo de la solicitud
        await validateSchema(newCommentSchema, { content });

        // Insertamos el comentario en la base de datos
        const commentId = await insertCommentModel(req.user.id, post_id, content);

        res.send({
            status: 'ok',
            data: {
                comment: {
                    id: commentId,
                    user_id: req.user.id,
                    username: req.user.username,
                    post_id: post_id,
                    content,
                    created_at: new Date()
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newCommentController;
