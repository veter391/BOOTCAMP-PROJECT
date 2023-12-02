const usersQueries = {
    createUser: 'INSERT INTO user (first_name, last_name, email, password, last_update, usertype) VALUES (?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    updateUser: 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, last_update = ?, usertype = ? WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?'
}

export default { usersQueries };