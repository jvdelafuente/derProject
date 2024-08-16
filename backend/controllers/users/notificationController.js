const { createNotification, getUserNotifications, markNotificationAsRead } = require("../../models/users/notificationsModel");

const newNotificationsController = async (req, res, next) => {
    try {
        const { user_id, type, target_id, data } = req.body;
        await createNotification(user_id, type, target_id, data);
        res.status(201).json({ status: "ok", message: "Notification created" });
    } catch (err) {
        next(err);
    }
};
const getNotificationsController = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const notifications = await getUserNotifications(user_id);
        res.status(200).json(notifications);
    } catch (err) {
        next(err);
    }
};
const markAsReadController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await markNotificationAsRead(id);
        res.status(200).json({ status: "ok", message: "Notification marked as read" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    newNotificationsController,
    getNotificationsController,
    markAsReadController
};
