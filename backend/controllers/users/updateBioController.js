const {updateBioModel, getBioModel} = require('../../models/users/updateBioModel');

const updateBioController = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { bio } = req.body;

        // Llamamos al modelo para actualizar la bio del usuario
        const updatedUser = await updateBioModel(user_id, bio);

        // Enviamos la respuesta con la información del usuario actualizado
        res.send({
            status: 'ok',
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        next(err);
    }
};
const getBioController = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        // Llamamos al modelo para obtener la bio del usuario
        const userBio = await getBioModel(user_id);

        // Enviamos la respuesta con la biografía del usuario
        res.send({
            status: 'ok',
            data: {
                bio: userBio.bio,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {updateBioController, getBioController};
