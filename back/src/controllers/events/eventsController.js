import DB from '../../db/configDB.js';

const createEvent = async (req, res) => {
  try {
    const { user_id, event_name, event_description, event_date } = req.body;

    // Realizar lógica para crear un nuevo evento en la base de datos
    const dbInfo = await DB.sendQuery('INSERT INTO events (user_id, event_name, event_description, event_date) VALUES (?, ?, ?, ?)', [
      user_id,
      event_name,
      event_description,
      event_date
    ]);

    res.status(201).json({ ...req.body, id: dbInfo.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  const getAllEvents = async (req, res) => {
    try {
      // Realizar lógica para obtener todos los eventos desde la base de datos
      const allEvents = await DB.sendQuery('SELECT * FROM events');
      
      res.status(200).json(allEvents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getEventById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Realizar lógica para obtener un evento por su ID desde la base de datos
      const event = await DB.sendQuery(DB.query.getEventById, [id]);
      
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const { event_name, event_description, event_date } = req.body;
  
      // Realizar lógica para actualizar información de un evento en la base de datos
      const dbInfo = await DB.sendQuery('UPDATE events SET event_name = ?, event_description = ?, event_date = ? WHERE id = ?', [
        event_name,
        event_description,
        event_date,
        id
      ]);
  
      if (dbInfo.affectedRows !== 0) {
        res.status(200).json({ message: `Event ${id} updated successfully` });
      } else {
        res.status(404).json({ message: 'Event not found or no changes applied' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Realizar lógica para eliminar un evento de la base de datos
      await DB.sendQuery('DELETE FROM events WHERE id = ?', [id]);
  
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export default {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
  };