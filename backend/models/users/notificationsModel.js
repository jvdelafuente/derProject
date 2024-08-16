const getDb = require("../../db/getDb");

const createNotification = async (user_id, type, targetId, data) => {
    let connection;
    try {
        connection = await getDb();

        // Solo crea una notificación si el usuario que realiza la acción no es el mismo que el usuario objetivo
        if (user_id !== targetId) {
            await connection.query(
                `INSERT INTO notifications (user_id, type, target_id, data, created_at) VALUES (?, ?, ?, ?, NOW())`,
                [targetId, type, user_id, data] // Revertir el orden para que el targetId sea el usuario que recibe la notificación
            );
        }
    } finally {
        if (connection) connection.release();
    }
};

const markNotificationAsRead = async (notificationId) => {
    let connection;
    try {
        connection = await getDb();
        await connection.query(
            `DELETE FROM notifications WHERE id = ?`,
            [notificationId]
        );
    } finally {
        if (connection) connection.release();
    }
};

const getUserNotifications = async (user_id) => {
    let connection;
    try {
        connection = await getDb();
        const [notifications] = await connection.query(
            `SELECT 
                n.id, 
                n.type, 
                n.target_id, 
                n.data, 
                n.created_at,
                u.username AS follower_username, 
                u.avatar AS follower_avatar
            FROM notifications n
            JOIN users u ON n.user_id = u.id
            WHERE n.target_id = ? -- Asegúrate de que la columna target_id sea correcta y se usa para filtrar las notificaciones dirigidas al usuario
            ORDER BY n.created_at DESC`,
            [user_id]
        );
        return notifications; // Devuelve las notificaciones con los datos del usuario que ha hecho la acción
    } finally {
        if (connection) connection.release();
    }
};


module.exports = {
    createNotification,
    getUserNotifications,
    markNotificationAsRead
};
