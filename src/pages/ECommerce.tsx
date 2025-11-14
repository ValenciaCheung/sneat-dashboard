import React from 'react';
import { 
  ShoppingCartIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  TruckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const ECommerce: React.FC = () => {
  // 来自 Layout 的全局暗色状态
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  // 电商统计数据
  const ecommerceStats = [
    {
      name: 'Total Revenue',
      value: '$124,563',
      change: '+18.2%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Total Orders',
      value: '1,847',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCartIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Customers',
      value: '2,394',
      change: '+8.7%',
      trend: 'up',
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Pending Orders',
      value: '156',
      change: '-5.2%',
      trend: 'down',
      icon: TruckIcon,
      color: 'bg-orange-500',
    },
  ]

  // 销售趋势数据
  const salesTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue ($K)',
        data: [65, 78, 90, 81, 95, 105, 124],
        borderColor: isDark ? 'rgb(99, 102, 241)' : 'rgb(99, 102, 241)',
        backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: [28, 35, 42, 38, 45, 52, 58],
        borderColor: isDark ? 'rgb(34, 197, 94)' : 'rgb(34, 197, 94)',
        backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  }

  // 产品类别销售数据
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: isDark
          ? [
              'rgba(99, 102, 241, 0.85)',
              'rgba(34, 197, 94, 0.85)',
              'rgba(251, 146, 60, 0.85)',
              'rgba(239, 68, 68, 0.85)',
              'rgba(168, 85, 247, 0.85)',
            ]
          : [
              'rgba(99, 102, 241, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 146, 60, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(168, 85, 247, 0.8)',
            ],
        borderWidth: 0,
      },
    ],
  }

  // 月度订单数据
  const monthlyOrders = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [120, 145, 180, 165, 195, 220],
        backgroundColor: isDark ? 'rgba(99, 102, 241, 0.85)' : 'rgba(99, 102, 241, 0.8)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        titleColor: isDark ? '#f3f4f6' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
      },
    },
  }

  // 热销产品数据
  const topProducts = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Electronics',
      price: '$999',
      sold: 245,
      revenue: '$244,755',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=iPhone%2014%20Pro%20product%20image%20on%20white%20background&image_size=square'
    },
    {
      id: 2,
      name: 'Nike Air Max',
      category: 'Sports',
      price: '$129',
      sold: 189,
      revenue: '$24,381',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Nike%20Air%20Max%20sneakers%20product%20image%20on%20white%20background&image_size=square'
    },
    {
      id: 3,
      name: 'MacBook Pro',
      category: 'Electronics',
      price: '$1,999',
      sold: 156,
      revenue: '$311,844',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=MacBook%20Pro%20laptop%20product%20image%20on%20white%20background&image_size=square'
    },
    {
      id: 4,
      name: "Levi's Jeans",
      category: 'Clothing',
      price: '$79',
      sold: 134,
      revenue: '$10,586',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Levi%27s%20jeans%20product%20image%20on%20white%20background&image_size=square'
    }
  ];

  // 最近订单数据
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Smith', product: 'iPhone 14 Pro', amount: '$999', status: 'Completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Sarah Johnson', product: 'Nike Air Max', amount: '$129', status: 'Processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Mike Wilson', product: 'MacBook Pro', amount: '$1,999', status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Lisa Brown', product: "Levi's Jeans", amount: '$79', status: 'Pending', date: '2024-01-14' },
    { id: '#ORD-005', customer: 'David Lee', product: 'AirPods Pro', amount: '$249', status: 'Completed', date: '2024-01-13' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className={`p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* 页面标题 */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">eCommerce Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor your online store performance and sales</p>
        </div>
        {/* 主题切换按钮已移除，统一使用 Layout 的主按钮 */}
      </div>

      {/* 电商统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ecommerceStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 销售趋势和产品类别 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 销售趋势 */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Sales Trend</h3>
          <div className="h-64">
            <Line data={salesTrend} options={chartOptions} />
          </div>
        </div>

        {/* 产品类别分布 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Sales by Category</h3>
          <div className="h-64">
            <Doughnut data={categoryData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 月度订单和热销产品 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月度订单 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Monthly Orders</h3>
          <div className="h-64">
            <Bar data={monthlyOrders} options={chartOptions} />
          </div>
        </div>

        {/* 热销产品 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Selling Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.sold} sold</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 最近订单 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h3>
          <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <EyeIcon className="h-4 w-4 mr-1" />
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ECommerce