import DB from '../../db/configDB.js';
import commentSchemas from '../../schemas/commentSchema.js'; 

const {
  CreateCommentSchema,
  UpdateCommentSchema,
} = commentSchemas;

const addComment = async (req, res) => {
  try {
    const { post_id, user_id, comment_text } = CreateCommentSchema.parse(req.body);

    //Obtener fecha actual
    const created_at = new Date();

    const dbInfo = await DB.sendQuery(DB.query.addComment, [post_id, user_id, comment_text, created_at]);

    res.status(201).json({ ...req.body, id: dbInfo.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await DB.sendQuery(DB.query.getAllComments);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsById = async (req, res) => {
  try {
    const { post_id } = req.params;

    const comments = await DB.sendQuery(DB.query.getCommentsById, [post_id]);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment_text } = UpdateCommentSchema.parse(req.body);

    const dbInfo = await DB.sendQuery(DB.query.updateComment, [comment_text, id]);

    if (dbInfo.affectedRows !== 0) {
      res.status(200).json({ message: `Comment ${id} updated successfully` });
    } else {
      res.status(404).json({ message: 'Comment not found or no changes applied' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await DB.sendQuery(DB.query.deleteComment, [id]);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addComment,
  getAllComments,
  getCommentsById,
  updateComment,
  deleteComment
};
