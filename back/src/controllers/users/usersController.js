import DB from '../../db/configDB.js';
import { CreateUserSchema, UpdateUserSchema } from '../../schemas/userSchema.js';

// CREATE USER
const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      city,
      password
    } = CreateUserSchema.parse(req.body);

    const dbInfo = await DB.sendQuery(
      DB.query.createUser,
      [
        first_name,
        last_name,
        email,
        city,

        password
      ]
    );
    console.log(typeof usertype);

    res.status(201).json({ ...req.body, id: dbInfo.insertId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await DB.sendQuery(DB.query.getAllUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER{id}
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await DB.sendQuery(DB.query.getUserById, [id]);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE USER{id}
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      first_name,
      last_name,
      email,
      city,
      password,
      avatar
    } = UpdateUserSchema.parse(req.body);

    const dbInfo = await DB.sendQuery(DB.query.updateUser, [
      first_name,
      last_name,
      email,
      city,
      password,
      avatar,
      id
    ]);

    if (dbInfo.affectedRows !== 0) {
      res.status(200).json({ message: `User ${id} updated successfully` });
    } else {
      res.status(404).json({ message: 'User not found or no changes applied' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER{id}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await DB.sendQuery(DB.query.deleteUser, [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
