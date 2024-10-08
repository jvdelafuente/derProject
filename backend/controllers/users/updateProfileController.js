// userController.js

const updateProfileModel = require('../../models/users/updateProfileModel');

const updateProfileController = async (req, res, next) => {
  const { user_id } = req.params
  const { username, email, password } = req.body;
  try {
    
    // Obtener los datos actuales del usuario
    const currentUser = await updateProfileModel.getUserById(user_id,);
    
    // Verificar si el usuario existe
    if (!currentUser) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }

    // Actualizar los datos del usuario
    const updatedUserData = {
      username: username || currentUser.username,
      email: email || currentUser.email,
      password: password || currentUser.password,
    };

    await updateProfileModel.updateProfileModel(user_id, updatedUserData);

    res.status(200).json({
      status: 'Ok',
      message: 'Perfil de usuario actualizado con éxito, quiza necesite actualizar para ver los cambios',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfileController;