import { sendQuery, query } from '../../db/configDB.js';
// import DB from '../../db/configDB.js';
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

    const dbInfo = await sendQuery(
      query.createUser,
      [
        first_name,
        last_name,
        email,
        password,
        last_update,
        usertype
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
    const allUsers = await sendQuery(query.getAllUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER{id}
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await sendQuery(query.getUserById, [id]);
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
      password,
      last_update,
      usertype
    } = req.body;

    // const [user] = await sendQuery(query.getUserById, [id])

    // if (!user) {
    //   return res.status(404).send({ message: 'User not found or no changes applied' })
    // }

    const dbInfo = await sendQuery(query.updateUser, [
      first_name,
      last_name,
      email,
      password,
      last_update,
      usertype,
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
    const { id } = DeleteUserSchema.parse(req.body);
    await sendQuery(query.deleteUser, [id]);
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
