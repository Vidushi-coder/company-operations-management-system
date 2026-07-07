const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');
const createNotification = require('../utils/notificationHelper');

const getEmployeeProfile = async (userId) => {
  return await Employee.findOne({ userId });
};

// APPLY FOR LEAVE (Employee only)
const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({ message: 'End date cannot be before start date' });
    }

    const employee = await getEmployeeProfile(req.user.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found for this user' });
    }

    const overlapping = await LeaveRequest.findOne({
      employeeId: employee._id,
      status: { $ne: 'Rejected' },
      $or: [
        { fromDate: { $lte: new Date(toDate) }, toDate: { $gte: new Date(fromDate) } }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'You already have a leave request for overlapping dates' });
    }

    const newLeave = await LeaveRequest.create({
      employeeId: employee._id,
      leaveType,
      fromDate,
      toDate,
      reason
    });

    res.status(201).json({ message: 'Leave request submitted successfully', leave: newLeave });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET LEAVE REQUESTS
// Employee → own requests only
// Admin/Manager → all requests (with optional filters)
const getLeaveRequests = async (req, res) => {
  try {
    const { status, employeeId } = req.query;
    let filter = {};

    if (req.user.role === 'Employee') {
      const employee = await getEmployeeProfile(req.user.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee profile not found' });
      }
      filter.employeeId = employee._id;
    } else {
      if (employeeId) filter.employeeId = employeeId;
    }

    if (status) filter.status = status;

    const leaves = await LeaveRequest.find(filter)
      .populate('employeeId', 'name department')
      .populate('reviewedBy', 'name role')
      .sort({ appliedAt: -1 });

    res.status(200).json({ count: leaves.length, leaves });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ONE LEAVE REQUEST
const getLeaveById = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id)
      .populate('employeeId', 'name department')
      .populate('reviewedBy', 'name role');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (req.user.role === 'Employee') {
      const employee = await getEmployeeProfile(req.user.id);
      if (!employee || leave.employeeId._id.toString() !== employee._id.toString()) {
        return res.status(403).json({ message: 'Access denied, this is not your leave request' });
      }
    }

    res.status(200).json({ leave });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// APPROVE LEAVE (Admin/Manager only)
const approveLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: `This request has already been ${leave.status.toLowerCase()}` });
    }

    leave.status = 'Approved';
    leave.reviewedBy = req.user.id;
    await leave.save();

    // Notify the employee their leave was approved
    try {
      const employee = await require('../models/Employee')
        .findById(leave.employeeId).populate('userId');
      if (employee?.userId) {
        await createNotification(
          employee.userId._id,
          'Leave Approved',
          `Your ${leave.leaveType} request has been approved`
        );
      }
    } catch (err) {
      console.error('Notification error:', err.message);
    }

    const updatedLeave = await LeaveRequest.findById(req.params.id)
      .populate('employeeId', 'name department')
      .populate('reviewedBy', 'name role');

    res.status(200).json({ message: 'Leave request approved successfully', leave: updatedLeave });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// REJECT LEAVE (Admin/Manager only)
const rejectLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: `This request has already been ${leave.status.toLowerCase()}` });
    }

    leave.status = 'Rejected';
    leave.reviewedBy = req.user.id;
    await leave.save();

    // Notify the employee their leave was rejected
    try {
      const employee = await require('../models/Employee')
        .findById(leave.employeeId).populate('userId');
      if (employee?.userId) {
        await createNotification(
          employee.userId._id,
          'Leave Rejected',
          `Your ${leave.leaveType} request has been rejected`
        );
      }
    } catch (err) {
      console.error('Notification error:', err.message);
    }

    const updatedLeave = await LeaveRequest.findById(req.params.id)
      .populate('employeeId', 'name department')
      .populate('reviewedBy', 'name role');

    res.status(200).json({ message: 'Leave request rejected successfully', leave: updatedLeave });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE LEAVE REQUEST (only if still Pending, by the Employee who applied)
const deleteLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (req.user.role === 'Employee') {
      const employee = await getEmployeeProfile(req.user.id);
      if (!employee || leave.employeeId.toString() !== employee._id.toString()) {
        return res.status(403).json({ message: 'Access denied, this is not your leave request' });
      }
      if (leave.status !== 'Pending') {
        return res.status(400).json({ message: 'You can only cancel a pending leave request' });
      }
    }

    await LeaveRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Leave request cancelled successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  applyLeave,
  getLeaveRequests,
  getLeaveById,
  approveLeave,
  rejectLeave,
  deleteLeave
};