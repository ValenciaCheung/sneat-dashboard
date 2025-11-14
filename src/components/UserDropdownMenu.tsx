import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  InboxIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface UserDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ 
  isOpen, 
  onClose, 
  triggerRef 
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose, triggerRef]);

  const handleSignOut = () => {
    navigate('/login');
    onClose();
  };

  const functionalMenuItems: MenuItem[] = [
    { icon: UserIcon, label: 'Profile', href: '#' },
    { icon: InboxIcon, label: 'Inbox', href: '#' },
    { icon: ChatBubbleLeftRightIcon, label: 'Chat', href: '#' },
  ];

  const settingsMenuItems: MenuItem[] = [
    { icon: Cog6ToothIcon, label: 'Settings', href: '#' },
    { icon: CurrencyDollarIcon, label: 'Pricing', href: '#' },
    { icon: QuestionMarkCircleIcon, label: 'FAQ', href: '#' },
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      {/* User Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20person%20avatar%20headshot&image_size=square"
            alt="User"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>

      {/* Functional Menu Items */}
      <div className="py-2">
        {functionalMenuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            role="menuitem"
          >
            <item.icon className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            {item.label}
          </a>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* Settings Menu Items */}
      <div className="py-2">
        {settingsMenuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            role="menuitem"
          >
            <item.icon className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            {item.label}
          </a>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* Sign Out Button */}
      <div className="py-2">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
          role="menuitem"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserDropdownMenu;