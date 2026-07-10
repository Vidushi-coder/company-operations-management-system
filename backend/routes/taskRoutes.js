const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.post('/', protect, authorizeRoles('Admin', 'Manager'), createTask);
router.get('/', protect, getAllTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, authorizeRoles('Admin', 'Manager'), deleteTask);
router.get('/employee/:employeeId', protect, async (req, res) => {
  try {
    const tasks = await require('../models/Task')
      .find({ assignedTo: req.params.employeeId })
      .populate('projectId', 'title');
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const tasks = await require('../models/Task')
      .find({ projectId: req.params.projectId })
      .populate('assignedTo', 'name');
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;