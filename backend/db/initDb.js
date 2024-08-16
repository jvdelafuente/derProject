// importamos variables de entorno de nuestro fichero .env
require('dotenv').config();

// importamos la función que nos da la conexión con la BDD
const getDb = require('./getDb.js');

// funcion que borrará las tablas de la BDD si existen
const init = async () => {
  let connection;

  try {
    let connection = await getDb();

    console.log('-> DELETING TABLES... <-');


    await connection.query('DROP TABLE IF EXISTS analytics');
    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS notifications');

    await connection.query('DROP TABLE IF EXISTS followers');
    await connection.query('DROP TABLE IF EXISTS upVotes');
    await connection.query('DROP TABLE IF EXISTS post');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('-> CREATING TABLES... <-');

    await connection.query(` 
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(30) UNIQUE NOT NULL,
            bio varchar(255) DEFAULT NULL,
            password VARCHAR(100) NOT NULL,
            avatar VARCHAR(100),
            role ENUM('admin', 'normal') DEFAULT 'normal',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS post (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL,
            text VARCHAR(400) NOT NULL,
            title VARCHAR(100),
            image VARCHAR(255) DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS upVotes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL,
            post_id INT UNSIGNED NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(post_id) REFERENCES post(id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS followers (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL,
            followers_id INT UNSIGNED NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(followers_id) REFERENCES users(id)
        )
    `);

    await connection.query(`
CREATE TABLE IF NOT EXISTS notifications (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    type ENUM('like', 'comment', 'follow', 'mention'),
    target_id INT UNSIGNED,
    data TEXT,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INT UNSIGNED NOT NULL,
        post_id INT UNSIGNED NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(post_id) REFERENCES post(id)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        event_type ENUM('sign_up', 'note_created') NOT NULL,
        user_id INT UNSIGNED,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_event_type (event_type)
      );
    `);

    console.log('¡TABLES SUCCESSFULLY CREATED!');
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

init();
