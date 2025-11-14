import express from 'express';
import { Contact, Message } from '../models/Chat.js';

const router = express.Router();

// Contact Routes
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
});

router.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
});

router.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error creating contact', error });
  }
});

router.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact', error });
  }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
});

// Update contact status
router.patch('/contacts/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact status', error });
  }
});

// Message Routes
router.get('/messages', async (req, res) => {
  try {
    const { contactId } = req.query;
    const filter = contactId ? { contactId: Number(contactId) } : {};
    const messages = await Message.find(filter).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

router.get('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching message', error });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating message', error });
  }
});

router.put('/messages/:id', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating message', error });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error });
  }
});

// Get messages by contact
router.get('/contacts/:contactId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ contactId: Number(req.params.contactId) })
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages for contact', error });
  }
});

export default router;