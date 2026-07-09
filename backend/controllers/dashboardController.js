const Employee = require('../models/Employee');
const Project = require('../models/Project');
const Task = require('../models/Task');
const LeaveRequest = require('../models/LeaveRequest');
const Notification = require('../models/Notification');

// Helper to get employee profile from userId
const getEmployeeProfile = async (userId) => {
  return await Employee.findOne({ userId });
};

// ADMIN DASHBOARD STATS
const getAdminStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'Active' });
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'Pending' });
    const unreadNotifications = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    // Employees by department
    const employeesByDepartment = await Employee.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Projects by status
    const projectsByStatus = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Tasks by status
    const tasksByStatus = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Leave requests by status
    const leavesByStatus = await LeaveRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Recent activity — last 5 leave requests
    const recentLeaves = await LeaveRequest.find()
      .populate('employeeId', 'name department')
      .sort({ appliedAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: { totalEmployees, activeProjects, pendingLeaves, unreadNotifications },
      charts: { employeesByDepartment, projectsByStatus, tasksByStatus, leavesByStatus },
      recentLeaves
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// MANAGER DASHBOARD STATS
const getManagerStats = async (req, res) => {
  try {
    const managedProjects = await Project.countDocuments({ createdBy: req.user.id });
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'Pending' });
    const unreadNotifications = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    // Tasks by status across all projects
    const tasksByStatus = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Projects by status for this manager
    const projectsByStatus = await Project.aggregate([
      { $match: { createdBy: req.user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Recent projects
    const recentProjects = await Project.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: { managedProjects, pendingLeaves, unreadNotifications },
      charts: { tasksByStatus, projectsByStatus },
      recentProjects
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// EMPLOYEE DASHBOARD STATS
const getEmployeeStats = async (req, res) => {
  try {
    const employee = await getEmployeeProfile(req.user.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    const myTasks = await Task.find({ assignedTo: employee._id })
      .populate('projectId', 'title status deadline');

    const myLeaves = await LeaveRequest.find({ employeeId: employee._id });
    const pendingLeaves = myLeaves.filter((l) => l.status === 'Pending').length;

    const unreadNotifications = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    // My tasks by status
    const tasksByStatus = [
      { _id: 'To Do', count: myTasks.filter((t) => t.status === 'To Do').length },
      { _id: 'In Progress', count: myTasks.filter((t) => t.status === 'In Progress').length },
      { _id: 'Done', count: myTasks.filter((t) => t.status === 'Done').length }
    ];

    // My tasks by priority
    const tasksByPriority = [
      { _id: 'High', count: myTasks.filter((t) => t.priority === 'High').length },
      { _id: 'Medium', count: myTasks.filter((t) => t.priority === 'Medium').length },
      { _id: 'Low', count: myTasks.filter((t) => t.priority === 'Low').length }
    ];

    // Unique projects from tasks
    const myProjects = [...new Map(
      myTasks
        .filter((t) => t.projectId)
        .map((t) => [t.projectId._id.toString(), t.projectId])
    ).values()];

    res.status(200).json({
      stats: {
        totalTasks: myTasks.length,
        pendingLeaves,
        activeProjects: myProjects.length,
        unreadNotifications
      },
      charts: { tasksByStatus, tasksByPriority },
      myTasks: myTasks.slice(0, 5),
      myProjects
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAdminStats, getManagerStats, getEmployeeStats };