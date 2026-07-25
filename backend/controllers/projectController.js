const Project = require('../models/Project');
const Employee = require('../models/Employee');
const createNotification = require('../utils/notificationHelper');

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { title, description, status, startDate, deadline } = req.body;

    const newProject = await Project.create({
      title,
      description,
      status,
      startDate,
      deadline,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: 'Project created successfully',
      project: newProject
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL PROJECTS (with search and status filter)
const getAllProjects = async (req, res) => {
  try {
    const { search, status } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (status) {
      filter.status = status;
    }

    const projects = await Project.find(filter)
      .populate('createdBy', 'name role')
      .populate('members', 'name department designation');

    res.status(200).json({ count: projects.length, projects });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ONE PROJECT (Detail Page)
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name role')
      .populate('members', 'name department designation');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const { title, description, status, startDate, deadline } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, status, startDate, deadline },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name role').populate('members', 'name department designation');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const Task = require('../models/Task');
    const Notification = require('../models/Notification');

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Clean up related notifications
    await Notification.deleteMany({
      message: { $regex: project.title, $options: 'i' },
      type: 'Project Assignment'
    });


    // Delete all tasks belonging to this project
    await Task.deleteMany({ projectId: req.params.id });

    // Delete the project
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Project and all related tasks deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ASSIGN MEMBER TO PROJECT
const assignMember = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.members.includes(employeeId)) {
      return res.status(400).json({ message: 'Employee is already a member of this project' });
    }

    project.members.push(employeeId);
    await project.save();

    // Notify the assigned employee
    try {
      const assignedEmployee = await Employee.findById(employeeId).populate('userId');
      if (assignedEmployee?.userId) {
        await createNotification(
          assignedEmployee.userId._id,
          'Project Assignment',
          `You have been added to the project: "${project.title}"`
        );
      }
    } catch (err) {
      console.error('Notification error:', err.message);
    }

    const updatedProject = await Project.findById(req.params.id)
      .populate('createdBy', 'name role')
      .populate('members', 'name department designation');

    res.status(200).json({ message: 'Member assigned successfully', project: updatedProject });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// REMOVE MEMBER FROM PROJECT
const removeMember = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.members = project.members.filter(
      (memberId) => memberId.toString() !== employeeId
    );
    await project.save();

    const updatedProject = await Project.findById(req.params.id)
      .populate('createdBy', 'name role')
      .populate('members', 'name department designation');

    res.status(200).json({ message: 'Member removed successfully', project: updatedProject });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  assignMember,
  removeMember
};