import DB from '../../db/configDB.js';

const searchEventsByName = async (req, res) => {
  try {
    const { eventName } = req.params;

    // partial search
    const searchTerm = `%${eventName}%`;

    const events = await DB.sendQuery(DB.query.searchEventsByName, [searchTerm]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchEventsByDate = async (req, res) => {
  try {
    const { eventDate } = req.params;

    const events = await DB.sendQuery(DB.query.searchEventsByDate, [eventDate]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchEventsByLocation = async (req, res) => {
  try {
    const { city } = req.body;

    const events = await DB.sendQuery(DB.query.searchEventsByLocation, [city]);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const { userName } = req.params;
    const searchTerm = `%${userName}%`;

    const users = await DB.sendQuery(DB.query.searchUserByName, [searchTerm]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUserByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const users = await DB.sendQuery(DB.query.searchUserByCity, [city]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchOrganizationByName = async (req, res) => {
  try {
    const { orgName } = req.params;
    const searchTerm = `%${orgName}%`;

    const organizations = await DB.sendQuery(DB.query.searchOrganizationByName, [searchTerm]);

    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchOrganizationByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const organizations = await DB.sendQuery(DB.query.searchOrganizationByCity, [city]);

    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  searchEventsByName,
  searchEventsByDate,
  searchEventsByLocation,
  searchUserByName,
  searchUserByCity,
  searchOrganizationByName,
  searchOrganizationByCity
};
