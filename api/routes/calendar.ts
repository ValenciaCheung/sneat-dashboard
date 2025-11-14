import express from 'express';
import { Event } from '../models/Calendar.js';

const router = express.Router();

// Get all events
router.get('/events', async (req, res) => {
  try {
    const { date, type } = req.query;
    let filter: any = {};
    
    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }
    
    if (type) {
      filter.type = type;
    }
    
    const events = await Event.find(filter).sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Get event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});

// Create new event
router.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
});

// Update event
router.put('/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

// Get events by date range
router.get('/events/range/:start/:end', async (req, res) => {
  try {
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
    
    const events = await Event.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1, time: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events by date range', error });
  }
});

// Get events by type
router.get('/events/type/:type', async (req, res) => {
  try {
    const events = await Event.find({ type: req.params.type })
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events by type', error });
  }
});

export default router;