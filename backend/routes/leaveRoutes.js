const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  applyLeave,
  getLeaveRequests,
  getLeaveById,
  approveLeave,
  rejectLeave,
  deleteLeave
} = require('../controllers/leaveController');

router.post('/', protect, applyLeave);
router.get('/', protect, getLeaveRequests);
router.get('/:id', protect, getLeaveById);
router.put('/:id/approve', protect, authorizeRoles('Admin', 'Manager'), approveLeave);
router.put('/:id/reject', protect, authorizeRoles('Admin', 'Manager'), rejectLeave);
router.delete('/:id', protect, deleteLeave);
router.get('/employee/:employeeId', protect, getLeaveByEmployeeId);

module.exports = router;