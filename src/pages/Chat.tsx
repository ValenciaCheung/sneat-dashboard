import React, { useState } from 'react';
import { 
  PaperAirplaneIcon, 
  FaceSmileIcon, 
  PaperClipIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  time: string;
  unreadCount: number;
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

const Chat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 联系人列表
  const contacts: Contact[] = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20avatar%20headshot&image_size=square',
      status: 'online',
      lastMessage: 'Hey, how\'s the project going?',
      time: '2 min ago',
      unreadCount: 2
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20woman%20avatar%20headshot&image_size=square',
      status: 'online',
      lastMessage: 'The design looks great! 👍',
      time: '5 min ago',
      unreadCount: 0
    },
    {
      id: 3,
      name: 'Mike Wilson',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20avatar%20headshot%20glasses&image_size=square',
      status: 'away',
      lastMessage: 'I\'ll review the documents tomorrow',
      time: '1 hour ago',
      unreadCount: 1
    },
    {
      id: 4,
      name: 'Lisa Brown',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20woman%20avatar%20headshot%20blonde&image_size=square',
      status: 'offline',
      lastMessage: 'Thanks for the update!',
      time: '2 hours ago',
      unreadCount: 0
    },
    {
      id: 5,
      name: 'David Lee',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20avatar%20headshot%20asian&image_size=square',
      status: 'online',
      lastMessage: 'Let\'s schedule a meeting',
      time: '3 hours ago',
      unreadCount: 0
    }
  ];

  // 聊天消息
  const messages: Message[] = [
    {
      id: 1,
      senderId: 1,
      content: 'Hi there! How are you doing today?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      senderId: 0, // 当前用户
      content: 'Hey John! I\'m doing great, thanks for asking. How about you?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      senderId: 1,
      content: 'I\'m good too! I wanted to check on the project status.',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: 4,
      senderId: 0,
      content: 'The project is going well. We\'re on track to meet the deadline.',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 5,
      senderId: 1,
      content: 'That\'s great to hear! Can you send me the latest report?',
      timestamp: '10:36 AM',
      type: 'text'
    },
    {
      id: 6,
      senderId: 0,
      content: 'Sure, I\'ll send it over in a few minutes.',
      timestamp: '10:37 AM',
      type: 'text'
    },
    {
      id: 7,
      senderId: 1,
      content: 'Hey, how\'s the project going?',
      timestamp: '2 min ago',
      type: 'text'
    }
  ];

  const selectedContactData = contacts.find(contact => contact.id === selectedContact);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      // 这里应该发送消息的逻辑
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 联系人列表 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* 搜索栏 */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 联系人列表 */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedContact === contact.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{contact.time}</span>
                      {contact.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 flex flex-col">
        {selectedContactData ? (
          <>
            {/* 聊天头部 */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={selectedContactData.avatar} 
                      alt={selectedContactData.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(selectedContactData.status)}`}></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedContactData.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{selectedContactData.status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.senderId === 0 ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {message.senderId !== 0 && (
                      <img 
                        src={selectedContactData.avatar} 
                        alt={selectedContactData.name}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <div className={`px-4 py-2 rounded-lg ${
                      message.senderId === 0 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 消息输入区域 */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <FaceSmileIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={sendMessage}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* 空状态 */
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <UserCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Choose a contact from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;