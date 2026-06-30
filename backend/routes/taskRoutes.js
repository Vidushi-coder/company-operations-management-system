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

module.exports = router;