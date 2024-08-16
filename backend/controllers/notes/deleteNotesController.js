// Importamos los modelos.
const deleteNotesModel = require('../../models/notes/deleteNotesModel');

// Función controladora final que elimina un note.
const deleteNotesController = async (req, res, next) => {
    try {
        // Obtenemos el id del note que queremos eliminar.
        const { post_id } = req.params;

        await deleteNotesModel(post_id, req.user.id);

        res.send({
            status: 'ok',
            message: 'Nota eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteNotesController;