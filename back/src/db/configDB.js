import mysql from 'mysql2/promise';

class DB {
  static query = {
    // User queries
    createUser: 'INSERT INTO users (first_name, last_name, org_name, email, password, description, city, address, avatar, cif, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password), city = IFNULL(?, city), avatar = IFNULL(?, avatar), last_update = NOW(), is_active = true WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',

    // Organization queries
    createOrganization: 'INSERT INTO organizations (name, email, password, city, address, cif) VALUES (?, ?, ?, ?, ?, ?)',
    getOrganizationById: 'SELECT * FROM organizations WHERE id = ?',
    getAllOrganizations: 'SELECT * FROM organizations',
    updateOrganization: 'UPDATE organizations SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password), description = IFNULL(?, description), city = IFNULL(?, city), address = IFNULL(?, address),  cif = IFNULL(?, cif), avatar = IFNULL(?, avatar), last_update = NOW() WHERE id = ?',
    deleteOrganization: 'DELETE FROM organizations WHERE id = ?',

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
    createEvent: 'INSERT INTO events (title, description, date, city, address, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    getAllEvents: 'SELECT e.id, user_id, title, e.description, e.city, e.address, first_name, last_name, org_name, avatar, date, type, is_finished FROM events e, users u WHERE u.id = e.user_id',
    getEventById: 'SELECT * FROM events WHERE id = ?',
    updateEvent: 'UPDATE events SET title = IFNULL(?, title), description = IFNULL(?, description), date = IFNULL(?, date), city = IFNULL(?, city), address = IFNULL(?, address), is_finished = IFNULL(?, is_finished), last_update = NOW() WHERE id = ?',
    deleteEvent: 'DELETE FROM events WHERE id = ?',

    // J: Search queries
    searchEventsByName: 'SELECT * FROM events WHERE name LIKE ?',
    searchEventsByDate: 'SELECT * FROM events WHERE date = ?',
    searchEventsByLocation: 'SELECT * FROM events WHERE city = ?',
    // search user by user_name
    searchUserByName: 'SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?',
    searchUserByCity: 'SELECT * FROM users WHERE city = ?',
    // Search organization by
    searchOrganizationByName: 'SELECT * FROM organizations WHERE name LIKE ? OR last_name LIKE ?',
    searchOrganizationByCity: 'SELECT * FROM organizations WHERE city = ?',

    // J: Follow queries
    followUser: 'INSERT INTO followers_users (user_id, follower_id) VALUES (?, ?)',
    unfollowUser: 'DELETE FROM followers WHERE user_id IN(?)',
    // getFollowers: 'SELECT * FROM followers_users WHERE user_id = ?',
    getFollowingUser: 'SELECT * FROM followers_users WHERE follower_id = ?',
    getUserFollowsByID: 'SELECT * FROM followers_users WHERE user_id = ? AND follower_id = ?',

    // Follow Organization queries
    followOrganization: 'INSERT INTO followers_org (organization_id, follower_id) VALUES (?, ?)',
    unfollowOrganization: 'DELETE FROM followers_org WHERE organization_id = ? AND follower_id = ?',
    getFollowersOrganizations: 'SELECT * FROM followers_org WHERE organization_id = ?',
    getFollowingOrganizations: 'SELECT * FROM followers_org WHERE follower_id = ?',

    // J: Queries para reacciones
    addReaction: 'INSERT INTO reactions (user_id, event_id) VALUES (?, ?)',
    getReactionsForPost: 'SELECT * FROM reactions WHERE id = ?',
    // updateReaction: 'UPDATE reactions SET reaction_type = IFNULL(?, reaction_type) WHERE id = ? AND user_id = ?',
    deleteReaction: 'DELETE FROM reactions WHERE id = ? AND user_id = ?',

    // J: Queries para CHAT
    getAllChats: 'SELECT * FROM chats',
    createChat: 'INSERT INTO chats (room_id, sender_id, receiver_id) VALUES (?, ?, ?)',
    // getChatUsers: 'SELECT * FROM users, chats WHERE users.id = chats.sender_id OR users.id = chats.receiver_id',
    getChatUsers: 'SELECT id, room_id, first_name, org_name, sender_id, receiver_id, email, avatar FROM users, chats WHERE users.id = chats.sender_id OR users.id = chats.receiver_id',
    getChatById: 'SELECT id, first_name, org_name, sender_id, receiver_id, email, avatar FROM chats c, users u WHERE c.room_id = ? AND (c.sender_id = u.id OR c.receiver_id = u.id)',
    deleteChat: 'DELETE FROM chats WHERE room_id = ?',

    // N: check user info
    checkEmail: 'SELECT * FROM users WHERE email = ?',
    getFollowers: 'SELECT user_id FROM followers WHERE follower_id = ?',
    getReactions: 'SELECT event_id FROM reactions WHERE user_id = ?'
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
