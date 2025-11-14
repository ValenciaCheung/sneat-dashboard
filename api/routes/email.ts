import express from 'express';
import { Email, EmailFolder } from '../models/Email.js';

const router = express.Router();

// Email Routes
router.get('/emails', async (req, res) => {
  try {
    const emails = await Email.find().sort({ time: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emails', error });
  }
});

router.get('/emails/:id', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.json(email);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching email', error });
  }
});

router.post('/emails', async (req, res) => {
  try {
    const email = new Email(req.body);
    const savedEmail = await email.save();
    res.status(201).json(savedEmail);
  } catch (error) {
    res.status(400).json({ message: 'Error creating email', error });
  }
});

router.put('/emails/:id', async (req, res) => {
  try {
    const updatedEmail = await Email.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.json(updatedEmail);
  } catch (error) {
    res.status(400).json({ message: 'Error updating email', error });
  }
});

router.delete('/emails/:id', async (req, res) => {
  try {
    const deletedEmail = await Email.findByIdAndDelete(req.params.id);
    if (!deletedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.json({ message: 'Email deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting email', error });
  }
});

// Mark email as read/unread
router.patch('/emails/:id/read', async (req, res) => {
  try {
    const { isRead } = req.body;
    const updatedEmail = await Email.findByIdAndUpdate(
      req.params.id,
      { isRead },
      { new: true }
    );
    if (!updatedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.json(updatedEmail);
  } catch (error) {
    res.status(400).json({ message: 'Error updating email read status', error });
  }
});

// Mark email as starred/unstarred
router.patch('/emails/:id/star', async (req, res) => {
  try {
    const { isStarred } = req.body;
    const updatedEmail = await Email.findByIdAndUpdate(
      req.params.id,
      { isStarred },
      { new: true }
    );
    if (!updatedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.json(updatedEmail);
  } catch (error) {
    res.status(400).json({ message: 'Error updating email star status', error });
  }
});

// Email Folder Routes
router.get('/folders', async (req, res) => {
  try {
    const folders = await EmailFolder.find().sort({ name: 1 });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching email folders', error });
  }
});

router.post('/folders', async (req, res) => {
  try {
    const folder = new EmailFolder(req.body);
    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating email folder', error });
  }
});

router.put('/folders/:id', async (req, res) => {
  try {
    const updatedFolder = await EmailFolder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFolder) {
      return res.status(404).json({ message: 'Email folder not found' });
    }
    res.json(updatedFolder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating email folder', error });
  }
});

router.delete('/folders/:id', async (req, res) => {
  try {
    const deletedFolder = await EmailFolder.findByIdAndDelete(req.params.id);
    if (!deletedFolder) {
      return res.status(404).json({ message: 'Email folder not found' });
    }
    res.json({ message: 'Email folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting email folder', error });
  }
});

export default router;