import express from 'express';
import eventsController from '../controllers/events/eventsController.js';

const eventRouter = express.Router();

eventRouter.post('/create', eventsController.createEvent);
eventRouter.get('/', eventsController.getAllEvents);
eventRouter.get('/:id', eventsController.getEventById);
eventRouter.put('/:id', eventsController.updateEvent);
eventRouter.delete('/:id', eventsController.deleteEvent);

export default eventRouter;