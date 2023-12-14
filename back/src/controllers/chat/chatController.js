import DB from '../../db/configDB.js';

const createChat = async (req, res) => {
  try {
    const { room, userId1, userId2 } = req.body;

    // insertar chat en la bbdd
    const result = await DB.sendQuery(DB.query.createChat, [room, userId1, userId2]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChat = async (req, res) => {
  try {
    const result = await DB.sendQuery(DB.query.getChatUsers);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChatById = async (req, res) => {
  try {
    const { room_id } = req.body;

    const result = await DB.sendQuery(DB.query.getChatById, [room_id]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { room_id } = req.body;

    const result = await DB.sendQuery(DB.query.deleteChat, [room_id]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createChat,
  getChat,
  getChatById,
  deleteChat
}
