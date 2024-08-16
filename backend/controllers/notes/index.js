const newNotesController = require('./newNotesController');
const newVoteController = require('./newVoteController')
const deleteVoteController = require('./deleteVoteController')
const deleteNotesController = require('./deleteNotesController');
const getNotesController = require('./getNotesController');
const getTrendingNotesController = require('./getTrendingNotesController');
const newCommentController = require('./newCommentController');
const getCommentsController = require('./getCommentsController');
const deleteCommentController = require('./deleteCommentController'); // importar el controlador de eliminar com

module.exports = {
    deleteCommentController,
    newNotesController,  
    newVoteController,
    deleteVoteController,
    deleteNotesController,
    getNotesController,
    getTrendingNotesController,
    newCommentController,
    getCommentsController
}

// cambiar el tema de las "s" asi no nos volvemos locos por ejemplo: votes o notes y note o vote en los controllers o los models.