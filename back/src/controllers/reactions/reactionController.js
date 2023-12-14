import DB from '../../db/configDB.js';

const addReaction = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    const dbInfo = await DB.sendQuery(DB.query.addReaction, [user_id, event_id]);

    res.status(201).json({ dbInfo, ...req.body, message: 'Reacción agregada a la publicación' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReactionsForPost = async (req, res) => {
  try {
    const { id } = req.params;
    const reactions = await DB.sendQuery(DB.query.getReactionsForPost, [id]);

    res.status(200).json({ reactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const updateReaction = async (req, res) => {
//   try {
//     const { id, user_id } = req.params;
//     const { reaction_type } = req.body;
//     const dbInfo = await DB.sendQuery(DB.query.updateReaction, [reaction_type, id, user_id]);

//     res.status(200).json({ dbInfo, ...req.body, message: 'Reacción actualizada' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const deleteReaction = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const dbInfo = await DB.sendQuery(DB.query.deleteReaction, [id, user_id]);
    res.status(200).json({ dbInfo, ...req.body, message: 'Reacción eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  addReaction,
  getReactionsForPost,
  // updateReaction,
  deleteReaction
};
