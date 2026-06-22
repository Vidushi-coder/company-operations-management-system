const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.post('/', protect, authorizeRoles('Admin'), createEmployee);
router.get('/', protect, getAllEmployees);
router.get('/:id', protect, getEmployeeById);
router.put('/:id', protect, authorizeRoles('Admin'), updateEmployee);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteEmployee);

module.exports = router;