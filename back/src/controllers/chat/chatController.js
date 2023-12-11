import { v4 as uuidv4 } from 'uuid';
import { sendQuery, query } from '../../db/configDB.js';

const createChat = async (req, res) => {
    try {
      const { userSenderId, userReceiverId } = req.body;
  
      //Generar idRoom
      const idRoom = uuidv4();
  
      //insertar chat en la bbdd
      const result = await sendQuery(query.createChat, [idRoom, userSenderId, userReceiverId]);
  
      const chatData = {
        idRoom,
        users: [userSenderId, userReceiverId]
      };
  
      res.status(200).json(chatData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export default {
    createChat
  }