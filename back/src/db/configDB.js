import mysql from 'mysql2/promise';

class DB {
  static query = {
    createUser: 'INSERT INTO users (first_name, last_name, email, password, last_update, usertype) VALUES (?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password), last_update = IFNULL(?, last_update), usertype = IFNULL(?, usertype)  WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',

    // Publications queries
    createPost: 'INSERT INTO posts (user_id, post_content, post_media, post_date) VALUES (?, ?, ?, NOW())',
    getPostsByUser: 'SELECT * FROM posts WHERE user_id = ?',
    getAllPosts: 'SELECT * FROM posts',
    updatePost: 'UPDATE posts SET post_content = ?, post_media = ?, post_date = NOW() WHERE id = ?',
    deletePost: 'DELETE FROM posts WHERE id = ?',

    // J: Comments queries
    addComment: 'INSERT INTO comments (post_id, user_id, comment_text, created_at) VALUES (?, ?, ?, ?)',
    getCommentsById: 'SELECT * FROM comments WHERE post_id = ?',
    getAllComments: 'SELECT * FROM comments WHERE post_id = ?',
    updateComment: 'UPDATE comments SET comment_text = ? WHERE id = ?',
    deleteComment: 'DELETE FROM comments WHERE id = ?',

    // J: Events queries
    createEvent: 'INSERT INTO events (user_id, event_name, event_description, event_date) VALUES (?, ?, ?, ?)',
    getAllEvents: 'SELECT * FROM events',
    getEventById: 'SELECT * FROM events WHERE id = ?',
    updateEvent: 'UPDATE events SET event_name = IFNULL(?, event_name), event_description = IFNULL(?, event_description), event_date = IFNULL(?, event_date) WHERE id = ?',
    deleteEvent: 'DELETE FROM events WHERE id = ?',

    // J: Search queries
    searchEventsByName: 'SELECT * FROM events WHERE event_name LIKE ?',
    searchEventsByType: 'SELECT * FROM events WHERE event_type = ?',
    searchEventsByDate: 'SELECT * FROM events WHERE event_date = ?',
    searchEventsByLocation: 'SELECT * FROM events WHERE event_location = ?',
    // search user by user_name
    searchUserByName: 'SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?',
    // search by "criterios": user_type, date, city, etc
    searchUserByUserType: 'SELECT * FROM users WHERE usertype = ?',
    searchUserByDate: 'SELECT * FROM users WHERE date = ?',
    searchUserByCity: 'SELECT * FROM users WHERE city = ?',

    // J: Follow queries
    followUser: 'INSERT INTO followers (follower_id, user_id) VALUES (?, ?)',
    unfollowUser: 'DELETE FROM followers WHERE follower_id = ? AND user_id = ?',
    getFollowers: 'SELECT * FROM followers WHERE user_id = ?',
    getFollowing: 'SELECT * FROM followers WHERE follower_id = ?',

    // J: Queries para reacciones
    addReactionToPost: 'INSERT INTO reactions (post_id, user_id, reaction_type) VALUES (?, ?, ?)',
    getReactionsForPost: 'SELECT * FROM reactions WHERE post_id = ?',
    updateReaction: 'UPDATE reactions SET reaction_type = IFNULL(?, reaction_type) WHERE post_id = ? AND user_id = ?',
    deleteReaction: 'DELETE FROM reactions WHERE post_id = ? AND user_id = ?',

    // J: Queries para CHAT
    createChat: 'INSERT INTO chats (room_id, sender_id, receiver_id) VALUES (?, ?, ?)',
    getAllChat: 'SELECT * FROM chats',
    getChatById: 'SELECT * FROM chats WHERE room_id = ?'
  };

  // N: fuvction return the object with all info about connection
  static async connection () {
    const { MYSQL_PORT, MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

    return await mysql.createConnection({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE
    });
  }

  // N: the function for send queryes to database
  static async sendQuery (query, values) {
    try {
      const connection = await this.connection();
      const [results] = await connection.query(query, values);

      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export const { query, sendQuery } = DB;
export default DB;
