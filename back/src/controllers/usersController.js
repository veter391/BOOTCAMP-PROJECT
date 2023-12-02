import usersQueries from "../config/queries/usersQueries";

//Funciones CRUD Endpoint:

//CREATE
const createUser = (req, res) => {
    const createUserQuery = usersQueries.createUser;

};

//GET USERS
const getAllUsers = (req, res) => {
    const getAllUsersQuery = usersQueries.getAllUsers;

};

//GET USERS{id}
const getUserById = (req, res) => {
    const getUserByIdQuery = usersQueries.getUserById;

};

//PUT USER{id}
const updateUser = (req, res) => {
    const updateUserQuery = usersQueries.updateUser;

};

//DELETE USER
const deleteUser = (req, res) => {
    const deleteUserQuery = usersQueries.deleteUser;

};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  };