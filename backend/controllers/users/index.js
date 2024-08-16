// controllers/index.js
const newUserController = require('./newUserController');
const loginUserController = require('./loginUserController');
const editAvatarController = require('./editAvatarController');
const getUserController = require('./getUserControllers');
const getPublicUserController = require('./getPublicUserController');
const updateProfileController = require('./updateProfileController');
const { getNotificationsController, newNotificationsController, markAsReadController } = require('./notificationController'); // Import correct
const {updateBioController, getBioController} = require('./updateBioController');
const followUserController = require('./followersController').followUserController; // Assuming these are named exports
const getFollowersController = require('./followersController').getFollowersController;
const getFollowingController = require('./followersController').getFollowingController;
const unfollowUserController = require('./followersController').unfollowUserController;

module.exports = {
  getBioController,
  updateBioController,
  markAsReadController,
  unfollowUserController,
  newUserController,
  loginUserController,
  editAvatarController,
  getUserController,
  getPublicUserController,
  updateProfileController,
  getNotificationsController,
  newNotificationsController,
  followUserController,
  getFollowersController,
  getFollowingController,
};
