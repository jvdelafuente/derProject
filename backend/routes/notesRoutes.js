// importamos express y creamos un router
const express = require('express');
const router = express.Router();

// importamos las funciones controladoras intermedias
const { authUserController, notesExistController, commentsExistController } = require('../middlewares');

// importamos las funciones controladores finales.

const { getCommentsController, getTrendingNotesController, newNotesController, getNotesController, newVoteController, deleteVoteController, deleteNotesController, newCommentController, deleteCommentController } = require('../controllers/notes');

// Inserta un note.
router.post('/notes', authUserController, newNotesController);

// Obtener todas las notas.
router.get('/notes', authUserController, getNotesController)

// Obtener las notas en orden de likes
router.get('/notes/trending', authUserController, getTrendingNotesController)

// Eliminar un note.
router.delete('/notes/:post_id', authUserController, notesExistController, deleteNotesController);

router.post('/notes/:post_id/comments', authUserController, newCommentController);
router.delete('/comments/:comment_id', authUserController, commentsExistController, deleteCommentController);
router.get('/notes/:post_id/comments',authUserController, getCommentsController);
//Insertar un voto
router.post('/notes/:post_id/upVotes', authUserController, newVoteController)

//Eliminar un voto
router.delete('/notes/:post_id/upVotes', authUserController, deleteVoteController)


module.exports = router