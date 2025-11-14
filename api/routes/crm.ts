import express from 'express';
import { CRMStats, SalesFunnel, Customer, Activity } from '../models/CRM.js';

const router = express.Router();

// CRM Stats Routes
router.get('/stats', async (req, res) => {
  try {
    const stats = await CRMStats.find().sort({ createdAt: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CRM stats', error });
  }
});

router.post('/stats', async (req, res) => {
  try {
    const stat = new CRMStats(req.body);
    const savedStat = await stat.save();
    res.status(201).json(savedStat);
  } catch (error) {
    res.status(400).json({ message: 'Error creating CRM stat', error });
  }
});

router.put('/stats/:id', async (req, res) => {
  try {
    const updatedStat = await CRMStats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStat) {
      return res.status(404).json({ message: 'CRM stat not found' });
    }
    res.json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: 'Error updating CRM stat', error });
  }
});

router.delete('/stats/:id', async (req, res) => {
  try {
    const deletedStat = await CRMStats.findByIdAndDelete(req.params.id);
    if (!deletedStat) {
      return res.status(404).json({ message: 'CRM stat not found' });
    }
    res.json({ message: 'CRM stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting CRM stat', error });
  }
});

// Sales Funnel Routes
router.get('/funnel', async (req, res) => {
  try {
    const funnel = await SalesFunnel.find().sort({ createdAt: -1 });
    res.json(funnel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales funnel', error });
  }
});

router.post('/funnel', async (req, res) => {
  try {
    const funnel = new SalesFunnel(req.body);
    const savedFunnel = await funnel.save();
    res.status(201).json(savedFunnel);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sales funnel', error });
  }
});

router.put('/funnel/:id', async (req, res) => {
  try {
    const updatedFunnel = await SalesFunnel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFunnel) {
      return res.status(404).json({ message: 'Sales funnel not found' });
    }
    res.json(updatedFunnel);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sales funnel', error });
  }
});

router.delete('/funnel/:id', async (req, res) => {
  try {
    const deletedFunnel = await SalesFunnel.findByIdAndDelete(req.params.id);
    if (!deletedFunnel) {
      return res.status(404).json({ message: 'Sales funnel not found' });
    }
    res.json({ message: 'Sales funnel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sales funnel', error });
  }
});

// Customer Routes
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
});

router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error });
  }
});

router.post('/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating customer', error });
  }
});

router.put('/customers/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer', error });
  }
});

router.delete('/customers/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
});

// Activity Routes
router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error });
  }
});

router.put('/activities/:id', async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity', error });
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error });
  }
});

export default router;