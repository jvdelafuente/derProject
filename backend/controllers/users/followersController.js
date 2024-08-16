const {unfollowUser, followUser, getFollowers, getFollowing } = require("../../models/users/followersModel");
const { createNotification } = require("../../models/users/notificationsModel");

const followUserController = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; // El usuario al que se sigue
        const followerId = req.user.id; // El usuario que sigue

        await followUser(user_id, followerId); // Registrar el follow

        // Crear notificación solo si el usuario objetivo (user_id) no es el mismo que el usuario que sigue (followerId)
        if (user_id !== followerId) {
            await createNotification(user_id, 'follow', followerId, null);
        }

        res.status(201).json({ status: "ok", message: "Followed user" });
    } catch (err) {
        next(err);
    }
};

const unfollowUserController = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; // El usuario que será dejado de seguir
        const followers_id = req.user.id; // El usuario que deja de seguir
        await unfollowUser(user_id, followers_id);
        res.status(200).json({ status: "ok", message: "Unfollowed user" });
    } catch (err) {
        next(err);
    }
};

const getFollowersController = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const followers = await getFollowers(user_id);
        res.status(200).json(followers); // Devuelve los seguidores en formato de array
    } catch (err) {
        next(err);
    }
};

const getFollowingController = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; // Cambiado a user_id para que sea consistente con el frontend
        const following = await getFollowing(user_id); // Cambiado a user_id para que sea consistente con el modelo
        res.status(200).json(following); // Devuelve los seguidos en formato de array
    } catch (err) {
        next(err);
    }
};

module.exports = {
    followUserController,
    unfollowUserController,
    getFollowersController,
    getFollowingController
};