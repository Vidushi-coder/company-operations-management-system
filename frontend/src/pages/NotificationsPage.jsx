import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const typeColors = {
    'Task Assigned': 'bg-blue-500',
    'Leave Approved': 'bg-green-500',
    'Leave Rejected': 'bg-red-500',
    'Project Assignment': 'bg-purple-500',
    'Leave Requested': 'bg-orange-500'
  };

  const typeDot = {
    'Task Assigned': 'bg-blue-500',
    'Leave Approved': 'bg-green-500',
    'Leave Rejected': 'bg-red-500',
    'Project Assignment': 'bg-purple-500',
    'Leave Requested': 'bg-orange-500'
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data.notifications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      setError('Failed to mark all as read');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => n._id === id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error('Failed to mark as read:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err.message);
    }
  };

  const tabs = ['All', 'Unread', 'Read'];

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'Unread') return !n.isRead;
    if (activeTab === 'Read') return n.isRead;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
          >
            {tab}
            {tab === 'Unread' && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-400 mb-4">⚠ {error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filteredNotifications.length === 0 ? (
        <p className="text-gray-400">
          No {activeTab !== 'All' ? activeTab.toLowerCase() : ''} notifications
        </p>
      ) : (
        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 flex items-start gap-4 ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${typeDot[notification.type] || 'bg-gray-500'}`} />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[notification.type] || 'bg-gray-700 text-gray-300'}`}>
                    {notification.type}
                  </span>
                  {!notification.isRead && (
                    <span className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded-full">New</span>
                  )}
                </div>
                <p className={`text-sm ${notification.isRead ? 'text-gray-400' : 'text-white'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{timeAgo(notification.createdAt)}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkRead(notification._id)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification._id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default NotificationsPage;