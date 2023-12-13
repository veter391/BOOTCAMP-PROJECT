import DB from '../../db/configDB.js';

// reaccionar a una publicación
const addReactionToPost = async (req, res) => {
  try {
    const { post_id, user_id, reaction_type } = req.body;
    const dbInfo = await DB.sendQuery(DB.query.addReactionToPost, [post_id, user_id, reaction_type]);
    res.status(201).json({ dbInfo, ...req.body, message: 'Reacción agregada a la publicación' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET todas las reacciones de una publicación
const getReactionsForPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const reactions = await DB.sendQuery(DB.query.getReactionsForPost, [post_id]);
    res.status(200).json({ reactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update una reacción existente
const updateReaction = async (req, res) => {
  try {
    const { post_id, user_id } = req.params;
    const { reaction_type } = req.body;
    const dbInfo = await DB.sendQuery(DB.query.updateReaction, [reaction_type, post_id, user_id]);
    res.status(200).json({ dbInfo, ...req.body, message: 'Reacción actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una reacción
const deleteReaction = async (req, res) => {
  try {
    const { post_id, user_id } = req.params;
    const dbInfo = await DB.sendQuery(DB.query.deleteReaction, [post_id, user_id]);
    res.status(200).json({ dbInfo, ...req.body, message: 'Reacción eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  addReactionToPost,
  getReactionsForPost,
  updateReaction,
  deleteReaction
};
