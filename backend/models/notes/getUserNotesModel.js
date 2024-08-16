const getDb = require("../../db/getDb");

const getUserNotesModel = async (user_id) => {
  let connection;
  try {
    connection = await getDb();

    console.log(user_id);

const query = `
  SELECT post.id, post.title, post.text, post.image, post.created_at, COUNT(upVotes.id) AS votes, users.username, users.avatar
  FROM post
  LEFT JOIN upVotes ON post.id = upVotes.post_id
  INNER JOIN users ON post.user_id = users.id
  WHERE users.id = ?
  GROUP BY post.id
`;

    const [queryes] = await connection.query(query, [user_id]);

    return queryes
  
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUserNotesModel;