const bcrypt = require('bcrypt');
const getDb = require('../../db/getDb');
const { emailAlreadyRegisteredError, userAlreadyRegisteredError } = require('../../services/errorService');

const newUserModel = async (username, email, password) => {
    let connection;

    try {
        connection = await getDb();

        // Verifica si ya existe un usuario con el email dado
        let [users] = await connection.query(`SELECT id FROM users WHERE email= ?`, [email]);
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        // Verifica si ya existe un usuario con el nombre de usuario dado
        [users] = await connection.query(`SELECT id FROM users WHERE username= ?`, [username]);
        if (users.length > 0) {
            userAlreadyRegisteredError();
        }

        // Encripta la contraseña antes de guardar el usuario
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserta el nuevo usuario y recupera el ID
        const [result] = await connection.query(
            `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
            [email, username, hashedPassword]
        );

        return {
            id: result.insertId,
            email,
            username
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUserModel;
