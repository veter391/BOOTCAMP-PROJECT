import DB from '../../db/configDB.js';
// import DB from '../../db/configDB.js';

const createEvent = async (req, res) => {
  try {
    const { user_id, event_name, event_description, event_date } = req.body;

    const dbInfo = await DB.sendQuery(DB.query.createEvent, [
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
    const allEvents = await DB.sendQuery(DB.query.getAllEvents);

    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

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

    const dbInfo = await DB.sendQuery(DB.query.updateEvent, [
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

    await DB.sendQuery(DB.query.deleteEvent, [id]);

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
