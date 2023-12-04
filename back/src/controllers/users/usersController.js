
import usersQueries from '../../config/queries/usersQueries.js';

//CREATE USER
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, last_update, usertype } = req.body;
        const newUser = await usersQueries.createUser(first_name, last_name, email, password, last_update, usertype);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }     
     
};

//GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await usersQueries.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GET USER{id}
const getUserById = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await usersQueries.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//UPDATE USER{id}
const updateUser = async (req, res) => {
    try {
        const { id, first_name, last_name, email, password, last_update, usertype } = req.body;
        const updatedUser = await usersQueries.updateUser(id, first_name, last_name, email, password, last_update, usertype);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//DELETE USER{id}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        await usersQueries.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
