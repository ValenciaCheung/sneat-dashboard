import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { AnalyticsStats, ChartData, ProductData } from '../models/Analytics.js';
import { CRMStats, SalesFunnel, Customer, Activity } from '../models/CRM.js';
import { ECommerceStats, Product, Order } from '../models/ECommerce.js';
import { Email, EmailFolder } from '../models/Email.js';
import { Contact, Message } from '../models/Chat.js';
import { Event } from '../models/Calendar.js';

// Load environment variables
dotenv.config();

// Analytics Mock Data
const analyticsStatsData = [
  { name: 'Total Revenue', value: '$45,231', change: '+12.5%', changeType: 'increase', icon: 'TrendingUpIcon', color: 'text-green-600' },
  { name: 'Total Orders', value: '1,234', change: '+8.2%', changeType: 'increase', icon: 'ShoppingCartIcon', color: 'text-blue-600' },
  { name: 'Total Customers', value: '5,678', change: '+15.3%', changeType: 'increase', icon: 'UsersIcon', color: 'text-purple-600' },
  { name: 'Conversion Rate', value: '3.2%', change: '-2.1%', changeType: 'decrease', icon: 'ChartBarIcon', color: 'text-red-600' }
];

const chartDataSamples = [
  {
    title: 'Revenue Trend',
    type: 'line',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    }]
  },
  {
    title: 'Weekly Orders',
    type: 'bar',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Orders',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(34, 197, 94, 0.8)'
    }]
  },
  {
    title: 'Device Usage',
    type: 'doughnut',
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{
      data: [60, 30, 10],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
    }]
  }
];

const productDataSamples = [
  { product: 'iPhone 14 Pro', category: 'Electronics', sales: 1234, revenue: '$1,234,000', status: 'Active' },
  { product: 'MacBook Pro', category: 'Electronics', sales: 856, revenue: '$1,712,000', status: 'Active' },
  { product: 'AirPods Pro', category: 'Electronics', sales: 2341, revenue: '$585,250', status: 'Active' }
];

// CRM Mock Data
const crmStatsData = [
  { name: 'Total Leads', value: '2,543', change: '+18.2%', icon: 'UserPlusIcon', color: 'text-blue-600' },
  { name: 'Conversion Rate', value: '24.8%', change: '+5.1%', icon: 'TrendingUpIcon', color: 'text-green-600' },
  { name: 'Active Deals', value: '156', change: '+12.3%', icon: 'CurrencyDollarIcon', color: 'text-purple-600' },
  { name: 'Revenue', value: '$89,432', change: '+22.5%', icon: 'ChartBarIcon', color: 'text-green-600' }
];

const salesFunnelData = [
  { stage: 'Leads', count: 1000, percentage: 100, color: '#3B82F6' },
  { stage: 'Qualified', count: 600, percentage: 60, color: '#10B981' },
  { stage: 'Proposal', count: 300, percentage: 30, color: '#F59E0B' },
  { stage: 'Closed', count: 150, percentage: 15, color: '#EF4444' }
];

const customerData = [
  { name: 'John Doe', company: 'Tech Corp', email: 'john@example.com', status: 'Active', value: '$25,000' },
  { name: 'Jane Smith', company: 'Design Studio', email: 'jane@example.com', status: 'Active', value: '$12,000' },
  { name: 'Bob Johnson', company: 'Marketing Inc', email: 'bob@example.com', status: 'Prospect', value: '$4,500' }
];

const activityData = [
  { type: 'call', customer: 'John Doe', company: 'Tech Corp', action: 'Called about new proposal', time: '10:30 AM', icon: 'PhoneIcon', color: 'text-blue-600' },
  { type: 'email', customer: 'Jane Smith', company: 'Design Studio', action: 'Sent follow-up email', time: '2:20 PM', icon: 'MailIcon', color: 'text-green-600' },
  { type: 'meeting', customer: 'Bob Johnson', company: 'Marketing Inc', action: 'Meeting scheduled', time: '9:00 AM', icon: 'CalendarIcon', color: 'text-purple-600' }
];

// eCommerce Mock Data
const ecommerceStatsData = [
  { name: 'Total Revenue', value: '$124,563', change: '+15.2%', trend: 'up', icon: 'CurrencyDollarIcon', color: 'text-green-600' },
  { name: 'Total Orders', value: '3,456', change: '+8.7%', trend: 'up', icon: 'ShoppingBagIcon', color: 'text-blue-600' },
  { name: 'Total Customers', value: '12,789', change: '+12.1%', trend: 'up', icon: 'UsersIcon', color: 'text-purple-600' },
  { name: 'Pending Orders', value: '89', change: '-5.3%', trend: 'down', icon: 'ClockIcon', color: 'text-orange-600' }
];

const productSamples = [
  { name: 'Wireless Headphones', category: 'Electronics', price: '$199.99', sold: 456, revenue: '$91,194.44', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wireless%20headphones%20product%20photo&image_size=square' },
  { name: 'Smart Watch', category: 'Electronics', price: '$299.99', sold: 234, revenue: '$70,197.66', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20watch%20product%20photo&image_size=square' },
  { name: 'Laptop Stand', category: 'Accessories', price: '$49.99', sold: 789, revenue: '$39,441.11', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=laptop%20stand%20product%20photo&image_size=square' }
];

const orderSamples = [
  { orderId: 'ORD-001', customer: 'Alice Johnson', product: 'Wireless Headphones', amount: '$299.99', status: 'Completed', date: '2024-01-15' },
  { orderId: 'ORD-002', customer: 'Bob Smith', product: 'Smart Watch', amount: '$149.99', status: 'Processing', date: '2024-01-16' },
  { orderId: 'ORD-003', customer: 'Carol Davis', product: 'Laptop Stand', amount: '$89.99', status: 'Shipped', date: '2024-01-17' }
];

// Email Mock Data
const emailFolderData = [
  { name: 'Inbox', icon: 'InboxIcon', count: 12, active: true },
  { name: 'Sent', icon: 'PaperAirplaneIcon', count: 5, active: false },
  { name: 'Drafts', icon: 'DocumentTextIcon', count: 3, active: false },
  { name: 'Trash', icon: 'TrashIcon', count: 8, active: false }
];

const emailData = [
  {
    from: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Update',
    preview: 'Here is the latest update on our project...',
    time: '10:30 AM',
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    content: 'Full email content here...'
  },
  {
    from: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Meeting Tomorrow',
    preview: 'Don\'t forget about our meeting tomorrow at 2 PM...',
    time: '9:15 AM',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    content: 'Full email content here...'
  }
];

// Chat Mock Data
const contactData = [
  { name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', status: 'online', lastMessage: 'Hey, how are you?', time: '2 min ago', unreadCount: 2 },
  { name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', status: 'offline', lastMessage: 'See you tomorrow!', time: '1 hour ago', unreadCount: 0 },
  { name: 'Carol Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', status: 'away', lastMessage: 'Thanks for the help', time: '3 hours ago', unreadCount: 1 }
];

const messageData = [
  { senderId: 1, contactId: 1, content: 'Hey, how are you?', timestamp: '10:30 AM', type: 'text' },
  { senderId: 2, contactId: 1, content: 'I\'m doing great, thanks!', timestamp: '10:32 AM', type: 'text' },
  { senderId: 1, contactId: 1, content: 'That\'s awesome to hear!', timestamp: '10:35 AM', type: 'text' }
];

// Calendar Mock Data
const eventData = [
  { title: 'Team Meeting', date: new Date('2024-01-20'), time: '10:00 AM', duration: '1 hour', type: 'meeting', color: '#3B82F6', location: 'Conference Room A', attendees: ['john@example.com', 'jane@example.com'], description: 'Weekly team sync meeting' },
  { title: 'Project Deadline', date: new Date('2024-01-25'), time: '11:59 PM', duration: 'All day', type: 'task', color: '#EF4444', description: 'Final project submission deadline' },
  { title: 'Client Call', date: new Date('2024-01-22'), time: '2:00 PM', duration: '30 minutes', type: 'meeting', color: '#10B981', location: 'Zoom', attendees: ['client@example.com'], description: 'Discuss project requirements' }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      AnalyticsStats.deleteMany({}),
      ChartData.deleteMany({}),
      ProductData.deleteMany({}),
      CRMStats.deleteMany({}),
      SalesFunnel.deleteMany({}),
      Customer.deleteMany({}),
      Activity.deleteMany({}),
      ECommerceStats.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Email.deleteMany({}),
      EmailFolder.deleteMany({}),
      Contact.deleteMany({}),
      Message.deleteMany({}),
      Event.deleteMany({})
    ]);
    
    // Seed Analytics data
    console.log('📊 Seeding Analytics data...');
    await AnalyticsStats.insertMany(analyticsStatsData);
    await ChartData.insertMany(chartDataSamples);
    await ProductData.insertMany(productDataSamples);
    
    // Seed CRM data
    console.log('👥 Seeding CRM data...');
    await CRMStats.insertMany(crmStatsData);
    await SalesFunnel.insertMany(salesFunnelData);
    await Customer.insertMany(customerData);
    await Activity.insertMany(activityData);
    
    // Seed eCommerce data
    console.log('🛒 Seeding eCommerce data...');
    await ECommerceStats.insertMany(ecommerceStatsData);
    await Product.insertMany(productSamples);
    await Order.insertMany(orderSamples);
    
    // Seed Email data
    console.log('📧 Seeding Email data...');
    await EmailFolder.insertMany(emailFolderData);
    await Email.insertMany(emailData);
    
    // Seed Chat data
    console.log('💬 Seeding Chat data...');
    await Contact.insertMany(contactData);
    await Message.insertMany(messageData);
    
    // Seed Calendar data
    console.log('📅 Seeding Calendar data...');
    await Event.insertMany(eventData);
    
    console.log('✅ Database seeding completed successfully!');
    console.log('📈 Seeded data summary:');
    console.log(`   - Analytics Stats: ${analyticsStatsData.length} records`);
    console.log(`   - Chart Data: ${chartDataSamples.length} records`);
    console.log(`   - Product Data: ${productDataSamples.length} records`);
    console.log(`   - CRM Stats: ${crmStatsData.length} records`);
    console.log(`   - Sales Funnel: ${salesFunnelData.length} records`);
    console.log(`   - Customers: ${customerData.length} records`);
    console.log(`   - Activities: ${activityData.length} records`);
    console.log(`   - eCommerce Stats: ${ecommerceStatsData.length} records`);
    console.log(`   - Products: ${productSamples.length} records`);
    console.log(`   - Orders: ${orderSamples.length} records`);
    console.log(`   - Email Folders: ${emailFolderData.length} records`);
    console.log(`   - Emails: ${emailData.length} records`);
    console.log(`   - Contacts: ${contactData.length} records`);
    console.log(`   - Messages: ${messageData.length} records`);
    console.log(`   - Events: ${eventData.length} records`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();