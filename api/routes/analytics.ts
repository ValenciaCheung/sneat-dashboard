import express from 'express';
import { 
  AnalyticsStats, 
  ChartData, 
  ProductData, 
  RecentActivity, 
  GeographicData, 
  DeviceStats, 
  Notification, 
  QuickAction 
} from '../models/Analytics.js';

const router = express.Router();

// Get all analytics statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await AnalyticsStats.find().sort({ createdAt: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics stats', error });
  }
});

// Create new analytics statistic
router.post('/stats', async (req, res) => {
  try {
    const stat = new AnalyticsStats(req.body);
    const savedStat = await stat.save();
    res.status(201).json(savedStat);
  } catch (error) {
    res.status(400).json({ message: 'Error creating analytics stat', error });
  }
});

// Update analytics statistic
router.put('/stats/:id', async (req, res) => {
  try {
    const updatedStat = await AnalyticsStats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStat) {
      return res.status(404).json({ message: 'Analytics stat not found' });
    }
    res.json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: 'Error updating analytics stat', error });
  }
});

// Delete analytics statistic
router.delete('/stats/:id', async (req, res) => {
  try {
    const deletedStat = await AnalyticsStats.findByIdAndDelete(req.params.id);
    if (!deletedStat) {
      return res.status(404).json({ message: 'Analytics stat not found' });
    }
    res.json({ message: 'Analytics stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting analytics stat', error });
  }
});

// Get all chart data
router.get('/charts', async (req, res) => {
  try {
    const charts = await ChartData.find().sort({ createdAt: -1 });
    res.json(charts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data', error });
  }
});

// Get chart data by type
router.get('/charts/:type', async (req, res) => {
  try {
    const charts = await ChartData.find({ type: req.params.type });
    res.json(charts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data by type', error });
  }
});

// Create new chart data
router.post('/charts', async (req, res) => {
  try {
    const chart = new ChartData(req.body);
    const savedChart = await chart.save();
    res.status(201).json(savedChart);
  } catch (error) {
    res.status(400).json({ message: 'Error creating chart data', error });
  }
});

// Update chart data
router.put('/charts/:id', async (req, res) => {
  try {
    const updatedChart = await ChartData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedChart) {
      return res.status(404).json({ message: 'Chart data not found' });
    }
    res.json(updatedChart);
  } catch (error) {
    res.status(400).json({ message: 'Error updating chart data', error });
  }
});

// Delete chart data
router.delete('/charts/:id', async (req, res) => {
  try {
    const deletedChart = await ChartData.findByIdAndDelete(req.params.id);
    if (!deletedChart) {
      return res.status(404).json({ message: 'Chart data not found' });
    }
    res.json({ message: 'Chart data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chart data', error });
  }
});

// Get all product data
router.get('/products', async (req, res) => {
  try {
    const products = await ProductData.find().sort({ sales: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product data', error });
  }
});

// Create new product data
router.post('/products', async (req, res) => {
  try {
    const product = new ProductData(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product data', error });
  }
});

// Update product data
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product data not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product data', error });
  }
});

// Delete product data
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await ProductData.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product data not found' });
    }
    res.json({ message: 'Product data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product data', error });
  }
});

// Get all recent activities
router.get('/activities', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const activities = await RecentActivity.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent activities', error });
  }
});

// Create new activity
router.post('/activities', async (req, res) => {
  try {
    const activity = new RecentActivity(req.body);
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error });
  }
});

// Get geographic data
router.get('/geographic', async (req, res) => {
  try {
    const geoData = await GeographicData.find().sort({ revenue: -1 });
    res.json(geoData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching geographic data', error });
  }
});

// Create/Update geographic data
router.post('/geographic', async (req, res) => {
  try {
    const { countryCode } = req.body;
    const existingData = await GeographicData.findOne({ countryCode });
    
    if (existingData) {
      const updatedData = await GeographicData.findByIdAndUpdate(
        existingData._id,
        req.body,
        { new: true }
      );
      res.json(updatedData);
    } else {
      const geoData = new GeographicData(req.body);
      const savedData = await geoData.save();
      res.status(201).json(savedData);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error saving geographic data', error });
  }
});

// Get device statistics
router.get('/devices', async (req, res) => {
  try {
    const deviceStats = await DeviceStats.find().sort({ users: -1 });
    res.json(deviceStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device statistics', error });
  }
});

// Create/Update device statistics
router.post('/devices', async (req, res) => {
  try {
    const { deviceType, browserName, osName } = req.body;
    const existingStats = await DeviceStats.findOne({ 
      deviceType, 
      browserName, 
      osName 
    });
    
    if (existingStats) {
      const updatedStats = await DeviceStats.findByIdAndUpdate(
        existingStats._id,
        req.body,
        { new: true }
      );
      res.json(updatedStats);
    } else {
      const deviceStats = new DeviceStats(req.body);
      const savedStats = await deviceStats.save();
      res.status(201).json(savedStats);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error saving device statistics', error });
  }
});

// Get notifications
router.get('/notifications', async (req, res) => {
  try {
    const { userId, isRead } = req.query;
    const filter: any = {};
    
    if (userId) filter.userId = userId;
    if (isRead !== undefined) filter.isRead = isRead === 'true';
    
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

// Create new notification
router.post('/notifications', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ message: 'Error creating notification', error });
  }
});

// Mark notification as read
router.put('/notifications/:id/read', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: 'Error updating notification', error });
  }
});

// Get quick actions
router.get('/quick-actions', async (req, res) => {
  try {
    const actions = await QuickAction.find({ isEnabled: true })
      .sort({ order: 1 });
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quick actions', error });
  }
});

// Create new quick action
router.post('/quick-actions', async (req, res) => {
  try {
    const action = new QuickAction(req.body);
    const savedAction = await action.save();
    res.status(201).json(savedAction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating quick action', error });
  }
});

// Update quick action
router.put('/quick-actions/:id', async (req, res) => {
  try {
    const updatedAction = await QuickAction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAction) {
      return res.status(404).json({ message: 'Quick action not found' });
    }
    res.json(updatedAction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating quick action', error });
  }
});

// Get dashboard summary (aggregated data for overview)
router.get('/dashboard-summary', async (req, res) => {
  try {
    const [stats, recentActivities, notifications, topProducts] = await Promise.all([
      AnalyticsStats.find().sort({ createdAt: -1 }).limit(4),
      RecentActivity.find().sort({ timestamp: -1 }).limit(5),
      Notification.find({ isRead: false }).sort({ createdAt: -1 }).limit(3),
      ProductData.find().sort({ sales: -1 }).limit(5)
    ]);

    res.json({
      stats,
      recentActivities,
      notifications,
      topProducts,
      summary: {
        totalNotifications: notifications.length,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard summary', error });
  }
});

export default router;