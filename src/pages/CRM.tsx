import React from 'react';
import { 
  UserGroupIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  TrophyIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useCRMStats, useSalesFunnel, useCustomers, useActivities } from '../hooks/useApi';

const CRM: React.FC = () => {
  // 从API获取数据
  const { data: crmStatsData, loading: statsLoading } = useCRMStats();
  const { data: salesFunnelData, loading: funnelLoading } = useSalesFunnel();
  const { data: customersData, loading: customersLoading } = useCustomers();
  const { data: activitiesData, loading: activitiesLoading } = useActivities();

  // 来自 Layout 的全局暗色状态
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  // 图标映射
  const iconMap: { [key: string]: any } = {
    UserGroupIcon,
    TrophyIcon,
    ArrowUpIcon,
    PhoneIcon,
    EnvelopeIcon,
    CalendarIcon
  }

  // CRM 统计数据 - 从API获取或使用默认数据
  const crmStats = Array.isArray(crmStatsData)
    ? (crmStatsData as any[]).map((stat: any) => ({
        ...stat,
        icon: iconMap[stat.icon] || UserGroupIcon,
      }))
    : [
        {
          name: 'Total Customers',
          value: '2,847',
          change: '+12.5%',
          icon: UserGroupIcon,
          color: 'bg-blue-500',
        },
        {
          name: 'Active Deals',
          value: '156',
          change: '+8.2%',
          icon: TrophyIcon,
          color: 'bg-green-500',
        },
        {
          name: 'Conversion Rate',
          value: '24.8%',
          change: '+3.1%',
          icon: ArrowUpIcon,
          color: 'bg-purple-500',
        },
        {
          name: 'Revenue Pipeline',
          value: '$847K',
          change: '+15.7%',
          icon: TrophyIcon,
          color: 'bg-orange-500',
        },
      ]

  // 销售漏斗数据 - 从API获取或使用默认数据
  const funnelData = Array.isArray(salesFunnelData)
    ? (salesFunnelData as any[])
    : [
        { stage: 'Leads', count: 1250, percentage: 100, color: 'bg-blue-500' },
        { stage: 'Qualified', count: 875, percentage: 70, color: 'bg-indigo-500' },
        { stage: 'Proposal', count: 425, percentage: 34, color: 'bg-purple-500' },
        { stage: 'Negotiation', count: 185, percentage: 15, color: 'bg-pink-500' },
        { stage: 'Closed Won', count: 95, percentage: 8, color: 'bg-green-500' },
      ]

  // 客户分布图数据
  const customerDistribution = {
    labels: ['Enterprise', 'SMB', 'Startup', 'Individual'],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }

  // 月度销售数据
  const monthlySales = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales ($K)',
        data: [65, 78, 90, 81, 95, 105],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
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

  // 最近活动数据 - 从API获取或使用默认数据
  const recentActivities = Array.isArray(activitiesData)
    ? (activitiesData as any[]).map((activity: any) => ({
        ...activity,
        icon: iconMap[activity.icon] || PhoneIcon,
      }))
    : [
        {
          id: 1,
          type: 'call',
          customer: 'John Smith',
          company: 'Tech Corp',
          action: 'Called about pricing',
          time: '2 hours ago',
          icon: PhoneIcon,
          color: 'text-blue-500',
        },
        {
          id: 2,
          type: 'email',
          customer: 'Sarah Johnson',
          company: 'Design Studio',
          action: 'Sent proposal email',
          time: '4 hours ago',
          icon: EnvelopeIcon,
          color: 'text-green-500',
        },
        {
          id: 3,
          type: 'meeting',
          customer: 'Mike Wilson',
          company: 'StartupXYZ',
          action: 'Scheduled demo meeting',
          time: '6 hours ago',
          icon: CalendarIcon,
          color: 'text-purple-500',
        },
        {
          id: 4,
          type: 'call',
          customer: 'Lisa Brown',
          company: 'Enterprise Inc',
          action: 'Follow-up call completed',
          time: '1 day ago',
          icon: PhoneIcon,
          color: 'text-blue-500',
        },
      ]

  // 客户列表数据 - 从API获取或使用默认数据
  const customers = Array.isArray(customersData)
    ? (customersData as any[])
    : [
        { id: 1, name: 'John Smith', company: 'Tech Corp', email: 'john@techcorp.com', status: 'Active', value: '$25,000' },
        { id: 2, name: 'Sarah Johnson', company: 'Design Studio', email: 'sarah@design.com', status: 'Prospect', value: '$15,000' },
        { id: 3, name: 'Mike Wilson', company: 'StartupXYZ', email: 'mike@startup.com', status: 'Active', value: '$35,000' },
        { id: 4, name: 'Lisa Brown', company: 'Enterprise Inc', email: 'lisa@enterprise.com', status: 'Negotiation', value: '$50,000' },
      ]

  return (
    <div className={`p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* 页面标题 */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">CRM Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your customer relationships and sales pipeline</p>
        </div>
        {/* 主题切换按钮已移除，统一使用 Layout 的主按钮 */}
      </div>

      {/* CRM 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crmStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
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

      {/* 销售漏斗和图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 销售漏斗 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Sales Funnel</h3>
          <div className="space-y-4">
            {funnelData.map((stage: any, index: number) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stage.stage}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stage.count} leads</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${stage.color}`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stage.percentage}% conversion</div>
              </div>
            ))}
          </div>
        </div>

        {/* 月度销售图表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Monthly Sales Performance</h3>
          <div className="h-64">
            <Bar data={monthlySales} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 客户分布和活动时间线 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 客户分布 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Distribution</h3>
          <div className="h-64">
            <Doughnut data={customerDistribution} options={chartOptions} />
          </div>
        </div>

        {/* 最近活动 */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.customer} - {activity.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Customer List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deal Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {customers.map((customer: any, index: number) => (
                <tr key={customer._id || customer.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {customer.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : customer.status === 'Prospect'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {customer.dealValue || customer.value}
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

export default CRM