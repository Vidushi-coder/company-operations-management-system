const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'Task Assigned',
      'Leave Approved',
      'Leave Rejected',
      'Project Assignment'
    ],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: [
      'Task Assigned',
      'Leave Approved',
      'Leave Rejected',
      'Project Assignment',
      'Leave Requested'
    ],
    required: true
  }
});

module.exports = mongoose.model('Notification', notificationSchema);