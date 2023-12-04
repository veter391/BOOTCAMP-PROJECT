import mysql from 'mysql2/promise';

class DB {
  // N: all possibles connections to SQL database
  query = {
    createUser: 'INSERT INTO user (first_name, last_name, email, password, last_update, usertype) VALUES (?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password), last_update = IFNULL(?, last_update), usertype = IFNULL(?, usertype) WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?'
  };

  // N: fuvction return the object with all info about connection
  async connection () {
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
  async sendQuery (query, values) {
    const [results] = await this.connection().query(query, values);

    return results;
  };
}

export default DB;
