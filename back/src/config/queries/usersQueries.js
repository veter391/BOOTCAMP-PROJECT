
const usersQueries = {
    createUser: 'INSERT INTO user (first_name, last_name, email, password, last_update, usertype) VALUES (?, ?, ?, ?, ?, ?)',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getAllUsers: 'SELECT * FROM users',
    updateUser: 'UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), password = IFNULL(?, password), last_update = IFNULL(?, last_update), usertype = IFNULL(?, usertype) WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?'
}

export default usersQueries;