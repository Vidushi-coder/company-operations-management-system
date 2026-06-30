const Task = require('../models/Task');
const Employee = require('../models/Employee');

// Helper: find the Employee profile linked to the currently logged-in user
const getEmployeeProfile = async (userId) => {
  return await Employee.findOne({ userId });
};

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, projectId, assignedTo, dueDate } = req.body;

    const newTask = await Task.create({
      title,
      description,
      priority,
      status,
      projectId,
      assignedTo,
      dueDate,
      createdBy: req.user.id
    });

    res.status(201).json({ message: 'Task created successfully', task: newTask });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL TASKS (with filters, scoped automatically for Employee role)
const getAllTasks = async (req, res) => {
  try {
    const { projectId, status, priority } = req.query;
    let filter = {};

    if (projectId) filter.projectId = projectId;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (req.user.role === 'Employee') {
      const employee = await getEmployeeProfile(req.user.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee profile not found for this user' });
      }
      filter.assignedTo = employee._id;
    }

    const tasks = await Task.find(filter)
      .populate('projectId', 'title')
      .populate('assignedTo', 'name department')
      .populate('createdBy', 'name role');

    res.status(200).json({ count: tasks.length, tasks });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ONE TASK
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('projectId', 'title')
      .populate('assignedTo', 'name department')
      .populate('createdBy', 'name role');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'Employee') {
      const employee = await getEmployeeProfile(req.user.id);
      if (!employee || task.assignedTo._id.toString() !== employee._id.toString()) {
        return res.status(403).json({ message: 'Access denied, this task is not assigned to you' });
      }
    }

    res.status(200).json({ task });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE TASK (full update for Admin/Manager, status-only for the assigned Employee)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'Employee') {
      const employee = await getEmployeeProfile(req.user.id);

      if (!employee || task.assignedTo.toString() !== employee._id.toString()) {
        return res.status(403).json({ message: 'Access denied, this task is not assigned to you' });
      }

      const requestedFields = Object.keys(req.body);
      if (!req.body.status || requestedFields.length > 1) {
        return res.status(403).json({ message: 'You can only update the status of your assigned tasks' });
      }

      task.status = req.body.status;
      await task.save();

    } else {
      const { title, description, priority, status, projectId, assignedTo, dueDate } = req.body;
      Object.assign(task, { title, description, priority, status, projectId, assignedTo, dueDate });
      await task.save();
    }

    const updatedTask = await Task.findById(req.params.id)
      .populate('projectId', 'title')
      .populate('assignedTo', 'name department')
      .populate('createdBy', 'name role');

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };