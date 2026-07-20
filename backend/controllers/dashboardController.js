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

    // New KPI cards
    const pendingApprovals = pendingLeaves;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newEmployees = await Employee.countDocuments({
      dateOfJoining: { $gte: thirtyDaysAgo }
    });

    const today = new Date();
    const overdueTasks = await require('../models/Task').countDocuments({
      status: { $ne: 'Done' },
      dueDate: { $lt: today }
    });

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const projectsNearDeadline = await Project.countDocuments({
      status: { $in: ['Active', 'Not Started'] },
      deadline: { $gte: today, $lte: sevenDaysFromNow }
    });

    // Charts
    const employeesByDepartment = await Employee.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const projectsByStatus = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const tasksByStatus = await require('../models/Task').aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const leavesByStatus = await LeaveRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentLeaves = await LeaveRequest.find()
      .populate('employeeId', 'name department')
      .sort({ appliedAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        totalEmployees,
        activeProjects,
        pendingApprovals,
        newEmployees,
        overdueTasks,
        projectsNearDeadline
      },
      charts: {
        employeesByDepartment,
        projectsByStatus,
        tasksByStatus,
        leavesByStatus
      },
      recentLeaves
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// MANAGER DASHBOARD STATS
const getManagerStats = async (req, res) => {
  try {
    const Task = require('../models/Task');

    const managedProjects = await Project.countDocuments({ createdBy: req.user.id });

    // Team members — unique employees across all manager's projects
    const managerProjects = await Project.find({ createdBy: req.user.id });
    const allMemberIds = managerProjects.flatMap((p) => p.members.map((m) => m.toString()));
    const uniqueTeamMembers = [...new Set(allMemberIds)].length;

    // Tasks assigned today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const tasksAssignedToday = await Task.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    // Projects near deadline (next 7 days)
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const projectsNearDeadline = await Project.countDocuments({
      createdBy: req.user.id,
      status: { $in: ['Active', 'Not Started'] },
      deadline: { $gte: today, $lte: sevenDaysFromNow }
    });

    const tasksByStatus = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const projectsByStatus = await Project.aggregate([
      { $match: { createdBy: req.user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentProjects = await Project.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        managedProjects,
        uniqueTeamMembers,
        tasksAssignedToday,
        projectsNearDeadline
      },
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
    const Task = require('../models/Task');

    const employee = await getEmployeeProfile(req.user.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    const myTasks = await Task.find({ assignedTo: employee._id })
      .populate('projectId', 'title status deadline');

    const myLeaves = await LeaveRequest.find({ employeeId: employee._id });

    const unreadNotifications = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    // Leave balance — total approved leave days taken this year
    const currentYear = new Date().getFullYear();
    const approvedLeavesThisYear = myLeaves.filter((l) => {
      return l.status === 'Approved' &&
        new Date(l.fromDate).getFullYear() === currentYear;
    });

    const totalDaysTaken = approvedLeavesThisYear.reduce((total, leave) => {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
      return total + days;
    }, 0);

    const tasksByStatus = [
      { _id: 'To Do', count: myTasks.filter((t) => t.status === 'To Do').length },
      { _id: 'In Progress', count: myTasks.filter((t) => t.status === 'In Progress').length },
      { _id: 'Done', count: myTasks.filter((t) => t.status === 'Done').length }
    ];

    const tasksByPriority = [
      { _id: 'High', count: myTasks.filter((t) => t.priority === 'High').length },
      { _id: 'Medium', count: myTasks.filter((t) => t.priority === 'Medium').length },
      { _id: 'Low', count: myTasks.filter((t) => t.priority === 'Low').length }
    ];

    const myProjects = [...new Map(
      myTasks
        .filter((t) => t.projectId)
        .map((t) => [t.projectId._id.toString(), t.projectId])
    ).values()];

    res.status(200).json({
      stats: {
        totalTasks: myTasks.length,
        totalDaysTaken,
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