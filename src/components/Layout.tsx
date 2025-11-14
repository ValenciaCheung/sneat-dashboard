import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import NotificationPanel from './NotificationPanel';
import UserDropdownMenu from './UserDropdownMenu';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // 从localStorage读取主题设置，默认为false（白天模式）
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchModalAnimating, setSearchModalAnimating] = useState(false);

  // 通知面板状态
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // 导航菜单项
  const navigation = [
    {
      name: 'Dashboards',
      items: [
        { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
        { name: 'CRM', href: '/dashboard/crm', icon: UserGroupIcon },
        { name: 'eCommerce', href: '/dashboard/ecommerce', icon: ShoppingCartIcon },
      ]
    },
    {
      name: 'Apps',
      items: [
        { name: 'Email', href: '/apps/email', icon: EnvelopeIcon },
        { name: 'Chat', href: '/apps/chat', icon: ChatBubbleLeftRightIcon },
        { name: 'Calendar', href: '/apps/calendar', icon: CalendarDaysIcon },
      ]
    }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    // 这里应该处理登出逻辑
    navigate('/login');
  };

  // 处理通知面板关闭
  const handleNotificationPanelClose = () => {
    setNotificationPanelOpen(false);
  };

  // 处理标记所有通知为已读
  const handleReadAllNotifications = () => {
    console.log('All notifications marked as read');
    // 这里可以添加实际的标记已读逻辑
  };

  const handleUserButtonClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleUserDropdownClose = () => {
    setUserDropdownOpen(false);
  };

  // 应用主题到document元素
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openSearchModal = () => {
    setSearchModalOpen(true);
    setTimeout(() => setSearchModalAnimating(true), 10);
  };

  const closeSearchModal = () => {
    setSearchModalAnimating(false);
    setTimeout(() => setSearchModalOpen(false), 300);
  };

  const handleSearchOptionClick = (href: string) => {
    navigate(href);
    closeSearchModal();
  };

  // 搜索选项数据
  const searchOptions = [
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'CRM', href: '/dashboard/crm', icon: UserGroupIcon },
    { name: 'eCommerce', href: '/dashboard/ecommerce', icon: ShoppingCartIcon },
  ];

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* 移动端侧边栏遮罩 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* 侧边栏头部 */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Sneat</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {navigation.map((section) => (
            <div key={section.name}>
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.name}
              </h3>
              <div className="mt-3 space-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      setSidebarOpen(false);
                    }}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }`} />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* 侧边栏底部 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20person%20avatar%20headshot&image_size=square"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">John Doee</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部导航栏 */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            {/* 左侧 - 移动端菜单按钮 */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              
              {/* 搜索栏 */}
              <div className="hidden md:block ml-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    onClick={openSearchModal}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* 右侧 - 用户操作 */}
            <div className="flex items-center space-x-4">
              {/* 主题切换 */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title={darkMode ? '切换到白天模式' : '切换到黑夜模式'}
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>

              {/* 通知 */}
              <button 
                onClick={() => setNotificationPanelOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded-lg relative transition-colors duration-200"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* 用户菜单 */}
              <div className="relative">
                <button
                  ref={userButtonRef}
                  onClick={handleUserButtonClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                  id="user-menu-button"
                >
                  <img
                    src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20person%20avatar%20headshot&image_size=square"
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                </button>
                
                <UserDropdownMenu
                  isOpen={userDropdownOpen}
                  onClose={handleUserDropdownClose}
                  triggerRef={userButtonRef}
                />
              </div>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* 搜索弹窗 */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 半透明模糊遮罩 */}
          <div 
            className={`absolute inset-0 bg-black backdrop-blur-sm transition-all duration-300 ${
              searchModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeSearchModal}
          />
          
          {/* 弹窗内容 */}
          <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ${
            searchModalAnimating 
              ? 'scale-100 opacity-100 translate-y-0' 
              : 'scale-95 opacity-0 translate-y-4'
          }`}>
            {/* 弹窗顶部 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <button
                onClick={closeSearchModal}
                className="p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* 分割线已在上面的border-b中实现 */}

            {/* 弹窗内容 */}
            <div className="p-4">
              {/* POPULAR SEARCHES 标题 */}
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  POPULAR SEARCHES
                </h3>
              </div>

              {/* 搜索选项列表 */}
              <div className="space-y-1">
                {searchOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleSearchOptionClick(option.href)}
                    className="w-full flex items-center px-3 py-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <option.icon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 mr-3" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {option.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通知面板 */}
      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={handleNotificationPanelClose}
        onReadAll={handleReadAllNotifications}
      />
    </div>
  );
};

export default Layout;
