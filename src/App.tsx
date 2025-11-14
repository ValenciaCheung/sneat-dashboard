import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import CRM from './pages/CRM';
import ECommerce from './pages/ECommerce';
import Email from './pages/Email';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';

// 注册 Chart.js 组件
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  return (
    <Router>
      <Routes>
        {/* 认证路由 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* 主应用路由 */}
        <Route path="/" element={<Layout />}>
          {/* 默认重定向到 Analytics */}
          <Route index element={<Navigate to="/dashboard/analytics" replace />} />
          
          {/* Dashboard 路由 */}
          <Route path="dashboard/analytics" element={<Analytics />} />
          <Route path="dashboard/crm" element={<CRM />} />
          <Route path="dashboard/ecommerce" element={<ECommerce />} />
          
          {/* Apps 路由 */}
          <Route path="apps/email" element={<Email />} />
          <Route path="apps/chat" element={<Chat />} />
          <Route path="apps/calendar" element={<Calendar />} />
        </Route>
        
        {/* 404 重定向 */}
        <Route path="*" element={<Navigate to="/dashboard/analytics" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
