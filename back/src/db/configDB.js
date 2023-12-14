import mysql from 'mysql2/promise';

class DB {
  static query = {
    //User queries
    createUser: 'INSERT INTO users (first_name, last_name, email, city, password) VALUES (?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), city = IFNULL(?, city), password = IFNULL(?, password), avatar = IFNULL(?, avatar), last_update = NOW(), is_active = true WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',

    //Organization queries
    createOrganization: 'INSERT INTO organization (name, email, password, description, city, address, cif) VALUES (?, ?, ?, ?, ?, ?, ?)',
    getOrganizationById: 'SELECT * FROM organization WHERE id = ?',
    getAllOrganizations: 'SELECT * FROM organization',
    updateOrganization: 'UPDATE organization SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password), description = IFNULL(?, description), city = IFNULL(?, city), address = IFNULL(?, address), avatar = IFNULL(?, avatar), cif = IFNULL(?, cif), last_update = NOW() WHERE id = ?',
    deleteOrganization: 'DELETE FROM organization WHERE id = ?',

    // Publications queries (SE PUEDE IMPLEMENTAR MAS ADELANTE)
    createPost: 'INSERT INTO posts (user_id, post_content, post_media, post_date) VALUES (?, ?, ?, NOW())',
    getPostsByUser: 'SELECT * FROM posts WHERE user_id = ?',
    getAllPosts: 'SELECT * FROM posts',
    updatePost: 'UPDATE posts SET post_content = ?, post_media = ?, post_date = NOW() WHERE id = ?',
    deletePost: 'DELETE FROM posts WHERE id = ?',

    // J: Comments queries
    addComment: 'INSERT INTO comments (post_id, user_id, comment_text) VALUES (?, ?, ?)',
    getCommentsById: 'SELECT * FROM comments WHERE post_id = ?',
    getAllComments: 'SELECT * FROM comments',
    updateComment: 'UPDATE comments SET comment_text = ? WHERE id = ?',
    deleteComment: 'DELETE FROM comments WHERE id = ?',

    // J: Events queries
    createEvent: 'INSERT INTO events (user_id, organization_id, name, description, date, city, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
    getAllEvents: 'SELECT * FROM events',
    getEventById: 'SELECT * FROM events WHERE id = ?',
    updateEvent: 'UPDATE events SET name = IFNULL(?, name), description = IFNULL(?, description), date = IFNULL(?, date), city = IFNULL(?, city), address = IFNULL(?, address), is_finished = IFNULL(?, is_finished), last_update = NOW() WHERE id = ?',
    deleteEvent: 'DELETE FROM events WHERE id = ?',

    // J: Search queries
    searchEventsByName: 'SELECT * FROM events WHERE name LIKE ?',
    searchEventsByDate: 'SELECT * FROM events WHERE date = ?',
    searchEventsByLocation: 'SELECT * FROM events WHERE city = ?',
    // search user by user_name
    searchUserByName: 'SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?',
    searchUserByCity: 'SELECT * FROM users WHERE city = ?',
    //search organization by
    searchOrganizationByName: 'SELECT * FROM organization WHERE name LIKE ? OR last_name LIKE ?',
    searchOrganizationByCity: 'SELECT * FROM organization WHERE city = ?',

    // J: Follow queries
    followUser: 'INSERT INTO followers_users (user_id, follower_id) VALUES (?, ?)',
    unfollowUser: 'DELETE FROM followers_users WHERE follower_id = ? AND user_id = ?',
    getFollowers: 'SELECT * FROM followers_users WHERE user_id = ?',
    getFollowingUser: 'SELECT * FROM followers_users WHERE follower_id = ?',
    getUserFollowsByID: 'SELECT * FROM followers_users WHERE user_id = ? AND follower_id = ?',
    

    // Follow Organization queries
    followOrganization: 'INSERT INTO followers_org (organization_id, follower_id) VALUES (?, ?)',
    unfollowOrganization: 'DELETE FROM followers_org WHERE organization_id = ? AND follower_id = ?',
    getFollowersOrganizations:'SELECT * FROM followers_org WHERE organization_id = ?',
    getFollowingOrganizations: 'SELECT * FROM followers_org WHERE follower_id = ?',

    // J: Queries para reacciones
    addReactionToPost: 'INSERT INTO reactions (content, user_id) VALUES (?, ?)',
    getReactionsForPost: 'SELECT * FROM reactions WHERE id = ?',
    // updateReaction: 'UPDATE reactions SET reaction_type = IFNULL(?, reaction_type) WHERE id = ? AND user_id = ?',
    deleteReaction: 'DELETE FROM reactions WHERE id = ? AND user_id = ?',

    // J: Queries para CHAT
    createChat: 'INSERT INTO chats (room_id, sender_id, receiver_id) VALUES (?, ?, ?)',
    getChatUsers: 'SELECT * FROM users, chats WHERE users.id = chats.sender_id OR users.id = chats.receiver_id',
    // getChatUsers: 'SELECT * FROM users, chats',

    getChatById: 'SELECT * FROM chats WHERE room_id = ?',
    deleteChat: 'DELETE FROM chats WHERE room_id = ?'
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

export default DB;
