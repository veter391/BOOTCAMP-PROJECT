import mysql from 'mysql2/promise';

class DB {
  // N: all possibles connections to SQL database
  static query = {
    createUser: 'INSERT INTO users (first_name, last_name, email, password, last_update, usertype) VALUES (?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password), last_update = IFNULL(?, last_update), usertype = IFNULL(?, usertype)  WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',

    //J: Comments queries
    addComment: 'INSERT INTO comments (post_id, user_id, comment_text, created_at) VALUES (?, ?, ?, ?)',
    getCommentsById: 'SELECT * FROM comments WHERE post_id = ?',
    getAllComments: 'SELECT * FROM comments WHERE post_id = ?',
    updateComment: 'UPDATE comments SET comment_text = ? WHERE id = ?',
    deleteComment: 'DELETE FROM comments WHERE id = ?'
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
      const connection = await this.connection()
      const [results] = await connection.query(query, values);
  
      return results;      
    } catch (error) {
      throw new Error(error.message)
    }
  };
}

export default DB;
