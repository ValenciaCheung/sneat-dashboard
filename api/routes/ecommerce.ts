import express from 'express';
import { ECommerceStats, Product, Order } from '../models/ECommerce.js';

const router = express.Router();

// ECommerce Stats Routes
router.get('/stats', async (req, res) => {
  try {
    const stats = await ECommerceStats.find().sort({ createdAt: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eCommerce stats', error });
  }
});

router.post('/stats', async (req, res) => {
  try {
    const stat = new ECommerceStats(req.body);
    const savedStat = await stat.save();
    res.status(201).json(savedStat);
  } catch (error) {
    res.status(400).json({ message: 'Error creating eCommerce stat', error });
  }
});

router.put('/stats/:id', async (req, res) => {
  try {
    const updatedStat = await ECommerceStats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStat) {
      return res.status(404).json({ message: 'ECommerce stat not found' });
    }
    res.json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: 'Error updating eCommerce stat', error });
  }
});

router.delete('/stats/:id', async (req, res) => {
  try {
    const deletedStat = await ECommerceStats.findByIdAndDelete(req.params.id);
    if (!deletedStat) {
      return res.status(404).json({ message: 'ECommerce stat not found' });
    }
    res.json({ message: 'ECommerce stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting eCommerce stat', error });
  }
});

// Product Routes
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ sales: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Order Routes
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
});

router.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

export default router;