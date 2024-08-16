const getDb = require('../../db/getDb');

const updateBioModel = async (user_id, bio) => {
    let connection;
    try {
        connection = await getDb();

        const [result] = await connection.query(
            `UPDATE users SET bio = ? WHERE id = ?`,
            [bio, user_id]
        );

        if (result.affectedRows === 0) {
            throw new Error('User not found');
        }

        const [updatedUser] = await connection.query(
            `SELECT id, username, email, avatar, bio FROM users WHERE id = ?`,
            [user_id]
        );

        return updatedUser[0];
    } finally {
        if (connection) connection.release(); // Asegurarse de liberar la conexión
    }
};
const getBioModel = async (userId) => {
    let connection;
    try {
        connection = await getDb();

        const [user] = await connection.query(
            `SELECT bio FROM users WHERE id = ?`,
            [userId]
        );

        if (user.length === 0) {
            throw new Error('User not found');
        }

        return user[0];
    } finally {
        if (connection) connection.release();
    }
};
module.exports = {updateBioModel, getBioModel};
