const getDb = require('../../db/getDb');

// El usuario `followers_id` sigue al usuario `user_id`
const followUser = async (user_id, followers_id) => {
    let connection;
    try {
        connection = await getDb();
        await connection.query(
            `INSERT INTO followers (user_id, followers_id, created_at) VALUES (?, ?, NOW())`,
            [user_id, followers_id]
        );
    } finally {
        if (connection) connection.release();
    }
};

// El usuario `followers_id` deja de seguir al usuario `user_id`
const unfollowUser = async (user_id, followers_id) => {
    let connection;
    try {
        connection = await getDb();
        console.log(`Deleting from followers where user_id=${user_id} and followers_id=${followers_id}`);
        await connection.query(
            `DELETE FROM followers WHERE user_id = ? AND followers_id = ?`,
            [user_id, followers_id]
        );
    } finally {
        if (connection) connection.release();
    }
};

const getFollowers = async (user_id) => {
    let connection;
    try {
        connection = await getDb();
        const [followers] = await connection.query(
            `SELECT f.followers_id AS id, u.username, u.avatar 
            FROM followers f 
            JOIN users u ON f.followers_id = u.id 
            WHERE f.user_id = ?`,
            [user_id]
        );
        return followers; // Debería devolver un array de seguidores
    } finally {
        if (connection) connection.release();
    }
};

const getFollowing = async (user_id) => {
    let connection;
    try {
        connection = await getDb();
        const [following] = await connection.query(
            `SELECT f.user_id AS id, u.username, u.avatar 
            FROM followers f 
            JOIN users u ON f.user_id = u.id 
            WHERE f.followers_id = ?`,
            [user_id]
        );
        return following; // Devuelve un array de seguidos
    } finally {
        if (connection) connection.release();
    }
};
module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
};
