const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  assignMember,
  removeMember
} = require('../controllers/projectController');

router.post('/', protect, authorizeRoles('Admin', 'Manager'), createProject);
router.get('/', protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.put('/:id', protect, authorizeRoles('Admin', 'Manager'), updateProject);
router.delete('/:id', protect, authorizeRoles('Admin', 'Manager'), deleteProject);
router.post('/:id/assign-member', protect, authorizeRoles('Admin', 'Manager'), assignMember);
router.delete('/:id/members/:employeeId', protect, authorizeRoles('Admin', 'Manager'), removeMember);

module.exports = router;