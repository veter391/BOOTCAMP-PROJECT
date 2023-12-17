import DB from '../../db/configDB.js';
import eventSchemas from '../../schemas/eventSchema.js';

const {
  CreateEventSchema,
  UpdateEventSchema
} = eventSchemas;

const createEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      foto,
      city,
      address,
      user_id
    } = CreateEventSchema.parse(req.body);

    const data = req.body;
    console.log(data);

    const dbInfo = await DB.sendQuery(DB.query.createEvent, [
      name,
      description,
      date,
      foto,
      city,
      address,
      user_id
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
    const { name, description, date, city, address, is_finished } = UpdateEventSchema.parse(req.body);

    const dbInfo = await DB.sendQuery(DB.query.updateEvent, [
      name,
      description,
      date,
      city,
      address,
      is_finished,
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
