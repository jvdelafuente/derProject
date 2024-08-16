const express = require('express');
const router = express.Router();

const { authUserController } = require('../middlewares/index');
const {
    registerSignUpEvent,
    registerNoteCreatedEvent,
    getEventCounts
} = require('../controllers/analitycsController');

const {
    getBioController,
    updateBioController,
    markAsReadController,
    newUserController,
    loginUserController,
    editAvatarController,
    getUserController,
    updateProfileController,
    getPublicUserController,
    newNotificationsController,
    getNotificationsController,
    followUserController,
    getFollowersController,
    getFollowingController,
    unfollowUserController // Asegúrate de que esto está aquí
} = require('../controllers/users');

// Rutas de usuario
router.post('/users/register', newUserController);
router.post('/users/login', loginUserController);
router.put('/users/:user_id/avatar', authUserController, editAvatarController);
router.get('/users', authUserController, getUserController);
router.put('/users/:user_id/profile', authUserController, updateProfileController);
router.get('/users/:user_id', authUserController, getPublicUserController);
router.put('/users/:user_id/bio',authUserController ,updateBioController);
router.get('/users/:user_id/bio', authUserController, getBioController);

router.delete('/notifications/:id', authUserController, markAsReadController);
router.post('/notifications', authUserController, newNotificationsController);
router.get('/notifications', authUserController, getNotificationsController);

router.post('/users/:user_id/follow', authUserController, followUserController);
router.get('/users/:user_id/followers', authUserController, getFollowersController);
router.get('/users/:user_id/following', authUserController, getFollowingController);
router.delete('/users/:user_id/unfollow', authUserController, unfollowUserController); // DELETE route for unfollow

// Rutas de analytics
router.post('/analytics/sign_up', authUserController, registerSignUpEvent);
router.post('/analytics/note_created', authUserController, registerNoteCreatedEvent);
router.get('/analytics/event_counts', authUserController, getEventCounts);

module.exports = router;