import mysql from 'mysql2/promise';

class DB {
  // N: all possibles connections to SQL database
  query = {
    getAllUsers: 'SELECT * FROM users',
    getUserById: 'SELECT * FROM users WHERE user_id = ?',
    addUser: 'INSERT INTO users (name, email, pass) VALUES (?, ?, ?)',
    deleeteUser: '',
    updateUser: ''

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
