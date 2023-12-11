import { sendQuery, query } from '../../db/configDB.js';
// import DB from '../../db/configDB.js';

// CREATE PUBLICATION
const createPost = async (req, res) => {
  try {
    const { user_id, post_content, post_media } = req.body;

    // Realiza la inserción en la base de datos
    const dbInfo = await sendQuery(query.createPost, [user_id, post_content, post_media]);

    res.status(201).json({ ...req.body, id: dbInfo.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET POSTS BY USER
const getPostsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const userPosts = await sendQuery(query.getPostsByUser, [user_id]);

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await sendQuery(query.getAllPosts);

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { post_content, post_media } = req.body;

    const dbInfo = await sendQuery(query.updatePost, [post_content, post_media, id]);

    if (dbInfo.affectedRows !== 0) {
      res.status(200).json({ message: `Post ${id} updated successfully` });
    } else {
      res.status(404).json({ message: 'Post not found or no changes applied' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await sendQuery(query.deletePost, [id]);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPost,
  getPostsByUser,
  getAllPosts,
  updatePost,
  deletePost
};
