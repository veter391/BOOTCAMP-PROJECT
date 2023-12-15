import express from 'express';
import searchController from '../controllers/search/searchController.js';

const searchRouter = express.Router();

// EVENT SEARCH
searchRouter.get('/events/byName/:eventName', searchController.searchEventsByName);
// searchRouter.get('/events/byType/:eventType', searchController.searchEventsByType);
searchRouter.get('/events/byDate/:eventDate', searchController.searchEventsByDate);
searchRouter.get('/events/city', searchController.searchEventsByLocation);

// USER SEARCH
searchRouter.get('/users/byName/:userName', searchController.searchUserByName);
// searchRouter.get('/users/byUserType/:userType', searchController.searchUserByUserType);
// searchRouter.get('/users/byDate/:date', searchController.searchUserByDate);
searchRouter.get('/users/byCity/:city', searchController.searchUserByCity);

export default searchRouter;
