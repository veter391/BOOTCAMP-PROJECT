import DB from '../../db/configDB.js';
import userSchemas from '../../schemas/userSchema.js';

// connect data base
// const database = new DB();
// // N: querys from DB class
// const query = dataBase.query;

const {
  CreateUserSchema,
  GetUserByIdSchema,
  GetAllUsersSchema,
  UpdateUserSchema,
  DeleteUserSchema
} = userSchemas;

// CREATE USER
const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      last_update,
      usertype
    } = CreateUserSchema.parse(req.body);

    const dbInfo = await DB.sendQuery(
      DB.query.createUser,
      [
        first_name,
        last_name,
        email,
        password,
        last_update,
        usertype
      ]
    );

    res.status(201).json({ ...req.body, id: dbInfo.insertId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await DB.sendQuery(DB.query.getAllUsers);
    const validateUsers = GetAllUsersSchema.parse(allUsers);
    res.status(200).json(validateUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER{id}
const getUserById = async (req, res) => {
  try {
    const { id } = GetUserByIdSchema.parse(req.body);
    const [user] = await DB.sendQuery(DB.getUserById, [id]);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// UPDATE USER{id}
const updateUser = async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email,
      password,
      last_update,
      usertype
    } = UpdateUserSchema.parse(req.body);

    const updatedUser = await DB.sendQuery(DB.updateUser,
      id,
      first_name,
      last_name,
      email,
      password,
      last_update,
      usertype
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// DELETE USER{id}
const deleteUser = async (req, res) => {
  try {
    const { id } = DeleteUserSchema.parse(req.body);
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