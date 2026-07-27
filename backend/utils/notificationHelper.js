const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotification = async (userId, type, message) => {
  try {
    await Notification.create({ userId, type, message });
  } catch (error) {
    console.error('Failed to create notification:', error.message);
  }
};

const notifyAllAdmins = async (type, message) => {
  try {
    const admins = await User.find({ role: 'Admin' });
    for (const admin of admins) {
      await Notification.create({ userId: admin._id, type, message });
    }
  } catch (error) {
    console.error('Failed to notify admins:', error.message);
  }
};

module.exports = { createNotification, notifyAllAdmins };