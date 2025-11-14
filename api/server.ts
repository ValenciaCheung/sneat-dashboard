import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

// Import routes
import analyticsRoutes from './routes/analytics.js';
import crmRoutes from './routes/crm.js';
import ecommerceRoutes from './routes/ecommerce.js';
import emailRoutes from './routes/email.js';
import chatRoutes from './routes/chat.js';
import calendarRoutes from './routes/calendar.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/ecommerce', ecommerceRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/calendar', calendarRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sneat Dashboard API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

export default app;