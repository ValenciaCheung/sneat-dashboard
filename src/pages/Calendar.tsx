import React, { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: 'meeting' | 'task' | 'reminder' | 'event';
  color: string;
  location?: string;
  attendees?: string[];
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);

  // 示例事件数据
  const events: Event[] = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 0, 15),
      time: '10:00 AM',
      duration: '1 hour',
      type: 'meeting',
      color: 'bg-blue-500',
      location: 'Conference Room A',
      attendees: ['John Smith', 'Sarah Johnson']
    },
    {
      id: 2,
      title: 'Project Review',
      date: new Date(2024, 0, 16),
      time: '2:00 PM',
      duration: '2 hours',
      type: 'meeting',
      color: 'bg-green-500',
      location: 'Online',
      attendees: ['Mike Wilson', 'Lisa Brown']
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(2024, 0, 18),
      time: '11:00 AM',
      duration: '1.5 hours',
      type: 'event',
      color: 'bg-purple-500',
      location: 'Client Office',
      attendees: ['David Lee']
    },
    {
      id: 4,
      title: 'Code Review',
      date: new Date(2024, 0, 19),
      time: '3:00 PM',
      duration: '1 hour',
      type: 'task',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Deadline Reminder',
      date: new Date(2024, 0, 20),
      time: '9:00 AM',
      duration: '30 min',
      type: 'reminder',
      color: 'bg-red-500'
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return UserGroupIcon;
      case 'task':
        return CalendarDaysIcon;
      case 'reminder':
        return ClockIcon;
      default:
        return CalendarDaysIcon;
    }
  };

  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题和控制按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your schedule and events</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white rounded-lg border border-gray-300">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
          </div>
          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 日历主视图 */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
          {/* 日历头部 */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* 日历网格 */}
          <div className="p-6">
            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* 日期网格 */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[100px] p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      isSelected ? 'bg-blue-50 border-blue-200' : ''
                    } ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                    }`}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 侧边栏 - 今日事件 */}
        <div className="space-y-6">
          {/* 今日事件 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <p className="text-sm text-gray-500">{todayEvents.length} events</p>
            </div>
            <div className="p-4">
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event) => {
                    const IconComponent = getEventTypeIcon(event.type);
                    return (
                      <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className={`p-2 rounded-lg ${event.color}`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {event.time} ({event.duration})
                          </div>
                          {event.location && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                          )}
                          {event.attendees && event.attendees.length > 0 && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <UserGroupIcon className="h-3 w-3 mr-1" />
                              {event.attendees.length} attendees
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarDaysIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No events for this day</p>
                </div>
              )}
            </div>
          </div>

          {/* 快速添加事件 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Add</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserGroupIcon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Meeting</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CalendarDaysIcon className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Task</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ClockIcon className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Reminder</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 新建事件模态框 */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Event</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={format(selectedDate, 'yyyy-MM-dd')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="meeting">Meeting</option>
                  <option value="task">Task</option>
                  <option value="reminder">Reminder</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event location"
                />
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;