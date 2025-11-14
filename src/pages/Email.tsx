import React, { useState } from 'react';
import { 
  InboxIcon, 
  PaperAirplaneIcon, 
  DocumentIcon, 
  TrashIcon,
  StarIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PaperClipIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const Email: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(1);
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 邮件文件夹
  const folders = [
    { name: 'Inbox', icon: InboxIcon, count: 12, active: true },
    { name: 'Sent', icon: PaperAirplaneIcon, count: 0, active: false },
    { name: 'Drafts', icon: DocumentIcon, count: 3, active: false },
    { name: 'Trash', icon: TrashIcon, count: 5, active: false },
    { name: 'Starred', icon: StarIcon, count: 8, active: false },
  ];

  // 邮件列表数据
  const emails = [
    {
      id: 1,
      from: 'John Smith',
      email: 'john@techcorp.com',
      subject: 'Project Update - Q1 Results',
      preview: 'Hi team, I wanted to share the latest updates on our Q1 project results. The numbers look great and we\'ve exceeded our targets...',
      time: '10:30 AM',
      isRead: false,
      isStarred: true,
      hasAttachment: true,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20avatar%20headshot&image_size=square'
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      email: 'sarah@design.com',
      subject: 'Design Review Meeting',
      preview: 'Hello everyone, I\'ve scheduled a design review meeting for tomorrow at 2 PM. Please review the attached mockups before the meeting...',
      time: '9:15 AM',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20woman%20avatar%20headshot&image_size=square'
    },
    {
      id: 3,
      from: 'Mike Wilson',
      email: 'mike@startup.com',
      subject: 'Partnership Proposal',
      preview: 'Dear team, I hope this email finds you well. I\'m reaching out to discuss a potential partnership opportunity that could benefit both our companies...',
      time: 'Yesterday',
      isRead: true,
      isStarred: true,
      hasAttachment: true,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20avatar%20headshot%20glasses&image_size=square'
    },
    {
      id: 4,
      from: 'Lisa Brown',
      email: 'lisa@enterprise.com',
      subject: 'Budget Approval Request',
      preview: 'Hi there, I need your approval for the marketing budget for next quarter. The detailed breakdown is attached to this email...',
      time: 'Yesterday',
      isRead: false,
      isStarred: false,
      hasAttachment: true,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20woman%20avatar%20headshot%20blonde&image_size=square'
    },
    {
      id: 5,
      from: 'David Lee',
      email: 'david@agency.com',
      subject: 'Website Redesign Proposal',
      preview: 'Good morning! I\'ve prepared a comprehensive proposal for your website redesign project. The proposal includes timeline, costs, and deliverables...',
      time: '2 days ago',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20avatar%20headshot%20asian&image_size=square'
    }
  ];

  const selectedEmailData = emails.find(email => email.id === selectedEmail);

  const toggleStar = (emailId: number) => {
    // 这里应该更新邮件的星标状态
    console.log('Toggle star for email:', emailId);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 侧边栏 */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* 写邮件按钮 */}
        <div className="p-4">
          <button 
            onClick={() => setIsComposing(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
          >
            <PencilSquareIcon className="h-5 w-5" />
            <span>Compose</span>
          </button>
        </div>

        {/* 文件夹列表 */}
        <div className="flex-1 px-4">
          <nav className="space-y-1">
            {folders.map((folder) => (
              <a
                key={folder.name}
                href="#"
                className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${
                  folder.active 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <folder.icon className="h-5 w-5" />
                  <span>{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    folder.active 
                      ? 'bg-blue-200 text-blue-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {folder.count}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 邮件列表 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* 搜索栏 */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 邮件列表 */}
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedEmail === email.id ? 'bg-blue-50 border-blue-200' : ''
              } ${!email.isRead ? 'bg-blue-25' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <img 
                  src={email.avatar} 
                  alt={email.from}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${!email.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {email.from}
                    </p>
                    <div className="flex items-center space-x-1">
                      {email.hasAttachment && (
                        <PaperClipIcon className="h-4 w-4 text-gray-400" />
                      )}
                      <button onClick={(e) => { e.stopPropagation(); toggleStar(email.id); }}>
                        {email.isStarred ? (
                          <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <StarIcon className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className={`text-sm mt-1 ${!email.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {email.preview}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{email.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 邮件内容区域 */}
      <div className="flex-1 flex flex-col">
        {isComposing ? (
          /* 写邮件界面 */
          <div className="flex-1 bg-white">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">New Message</h2>
              <button 
                onClick={() => setIsComposing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter recipient email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your message here..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                    <PaperClipIcon className="h-5 w-5" />
                    <span>Attach</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                    <FaceSmileIcon className="h-5 w-5" />
                    <span>Emoji</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Save Draft
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <PaperAirplaneIcon className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedEmailData ? (
          /* 邮件详情界面 */
          <div className="flex-1 bg-white">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img 
                    src={selectedEmailData.avatar} 
                    alt={selectedEmailData.from}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedEmailData.subject}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-gray-700">{selectedEmailData.from}</span>
                      <span className="text-sm text-gray-500">&lt;{selectedEmailData.email}&gt;</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{selectedEmailData.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => toggleStar(selectedEmailData.id)}>
                    {selectedEmailData.isStarred ? (
                      <StarIconSolid className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarIcon className="h-5 w-5 text-gray-400 hover:text-yellow-400" />
                    )}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedEmailData.preview}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {selectedEmailData.hasAttachment && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="flex items-center space-x-3">
                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">document.pdf (2.4 MB)</span>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Download</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 flex items-center space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Reply
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Forward
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* 空状态 */
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <InboxIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No email selected</h3>
              <p className="text-gray-500">Choose an email from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;