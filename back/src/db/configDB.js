import mysql from 'mysql2/promise';

class DB {
  static query = {
    createUser: 'INSERT INTO users (first_name, last_name, email, password, last_update, usertype) VALUES (?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password), last_update = IFNULL(?, last_update), usertype = IFNULL(?, usertype)  WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',
    //Publications queries
    createPost: 'INSERT INTO posts (user_id, post_content, post_media, post_date) VALUES (?, ?, ?, NOW())',
    getPostsByUser: 'SELECT * FROM posts WHERE user_id = ?',
    getAllPosts: 'SELECT * FROM posts',
    updatePost: 'UPDATE posts SET post_content = ?, post_media = ?, post_date = NOW() WHERE id = ?',
    deletePost: 'DELETE FROM posts WHERE id = ?'
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
