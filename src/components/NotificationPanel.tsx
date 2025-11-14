import React, { useState, useRef, useEffect } from 'react';
import { CheckCircleIcon, UserPlusIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'achievement' | 'system' | 'message' | 'payment' | 'order';
  title: string;
  description: string;
  date: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Congratulations! Flora 🎉',
    description: 'won the monthly best seller badge',
    date: 'Today',
    time: '5 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'system',
    title: 'New user registered.',
    description: 'Robert Anderson joined the team',
    date: 'Yesterday',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'message',
    title: 'New message received 👋',
    description: 'You have 10 unread messages',
    date: '11 Aug',
    time: '1 day ago',
    read: false
  },
  {
    id: '4',
    type: 'payment',
    title: 'PayPal',
    description: 'Received Payment',
    date: '25 May',
    time: '3 days ago',
    read: false
  },
  {
    id: '5',
    type: 'order',
    title: 'Received Order 📦',
    description: 'New order received from John',
    date: '19 Mar',
    time: '1 week ago',
    read: false
  }
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onReadAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, onReadAll }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isAnimating, setIsAnimating] = useState(false);

  // 点击外部区域关闭面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setIsAnimating(true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, onClose]);

  const getNotificationIcon = (type: Notification['type']) => {
    const iconClass = "h-4 w-4";
    const containerClass = "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0";
    
    switch (type) {
      case 'achievement':
        return (
          <div className={`${containerClass} bg-green-100`}>
            <CheckCircleIcon className={`${iconClass} text-green-600`} />
          </div>
        );
      case 'system':
        return (
          <div className={`${containerClass} bg-purple-100`}>
            <UserPlusIcon className={`${iconClass} text-purple-600`} />
          </div>
        );
      case 'message':
        return (
          <div className={`${containerClass} bg-blue-100`}>
            <ChatBubbleLeftRightIcon className={`${iconClass} text-blue-600`} />
          </div>
        );
      case 'payment':
        return (
          <div className={`${containerClass} bg-yellow-100`}>
            <CurrencyDollarIcon className={`${iconClass} text-yellow-600`} />
          </div>
        );
      case 'order':
        return (
          <div className={`${containerClass} bg-indigo-100`}>
            <ShoppingBagIcon className={`${iconClass} text-indigo-600`} />
          </div>
        );
      default:
        return (
          <div className={`${containerClass} bg-gray-100`}>
            <CheckCircleIcon className={`${iconClass} text-gray-600`} />
          </div>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleReadAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    onReadAll();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-0" />
      
      {/* 通知面板 */}
      <div 
        ref={panelRef}
        className={`absolute top-16 right-4 w-80 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        } sm:w-96 sm:right-6 md:w-96 md:right-8`}
      >
        {/* 面板头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Notifications
          </h3>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white dark:bg-red-500">
              {unreadCount} news
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 通知列表 */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div key={notification.id} className="relative">
              <div className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  {/* 左侧图标 */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* 中间内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight truncate">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight truncate">
                      {notification.description}
                    </p>
                    
                    {/* 日期标签已移除，保留布局紧凑性 */}
                  </div>
                  
                  {/* 右侧时间 */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 分隔线 */}
              {index < notifications.length - 1 && (
                <div className="border-b border-gray-100 dark:border-gray-700 mx-3 sm:mx-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* 底部操作区 */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleReadAll}
            className="w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150"
          >
            Read all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;