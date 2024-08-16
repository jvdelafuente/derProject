const getNotesModel = require('../../models/notes/getNotesModel');
const getCommentsModel = require('../../models/notes/getCommentsModel');

const getNotesController = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const notes = await getNotesModel(keyword, req.user?.id);

        // Agregar comentarios a cada nota
        for (const note of notes) {
            note.comments = await getCommentsModel(note.id);
        }

        res.json({
            status: 'ok',
            data: {
                notes: notes.map(note => ({
                    ...note,
                    owner: Boolean(note.owner),
                    votes: note.votes,
                }))
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getNotesController;
