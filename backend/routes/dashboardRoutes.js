const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { getAdminStats, getManagerStats, getEmployeeStats } = require('../controllers/dashboardController');

router.get('/admin', protect, authorizeRoles('Admin'), getAdminStats);
router.get('/manager', protect, authorizeRoles('Admin', 'Manager'), getManagerStats);
router.get('/employee', protect, getEmployeeStats);

module.exports = router;