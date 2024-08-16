// Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const getUserNotesModel = require('../../models/notes/getUserNotesModel')

// Función controladora final que devuelve los datos de un usuario.
const getPublicUserController = async (req, res, next) => {
    try {
        // Obtenemos el id del usuario.
        const { user_id } = req.params


        const users = await selectUserByIdModel(user_id);
        const post = await getUserNotesModel(user_id);

        console.log(users);

        delete users.email;

        res.send({
            status: 'ok',
            data: {
                user: {
                    ...users,
                    post
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPublicUserController;