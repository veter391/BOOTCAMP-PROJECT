import { sendQuery, query } from '../../db/configDB.js';
// import DB from '../../db/configDB.js';

const searchEventsByName = async (req, res) => {
  try {
    const { eventName } = req.params;

    // partial search
    const searchTerm = `%${eventName}%`;

    const events = await sendQuery(query.searchEventsByName, [searchTerm]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchEventsByType = async (req, res) => {
  try {
    const { eventType } = req.params;

    const events = await sendQuery(query.searchEventsByType, [eventType]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchEventsByDate = async (req, res) => {
  try {
    const { eventDate } = req.params;

    const events = await sendQuery(query.searchEventsByDate, [eventDate]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchEventsByLocation = async (req, res) => {
  try {
    const { eventLocation } = req.params;

    const events = await sendQuery(query.searchEventsByLocation, [eventLocation]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const { userName } = req.params;
    const searchTerm = `%${userName}%`;

    const users = await sendQuery(query.searchUserByName, [searchTerm]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUserByUserType = async (req, res) => {
  try {
    const { userType } = req.params;

    const users = await sendQuery(query.searchUserByUserType, [userType]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUserByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const users = await sendQuery(query.searchUserByDate, [date]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUserByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const users = await sendQuery(query.searchUserByCity, [city]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  searchEventsByName,
  searchEventsByType,
  searchEventsByDate,
  searchEventsByLocation,
  searchUserByName,
  searchUserByUserType,
  searchUserByDate,
  searchUserByCity
};