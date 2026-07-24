const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.post('/predict', protect, authorizeRoles('Admin', 'Manager'), async (req, res) => {
  try {
    const {
      team_size,
      task_count,
      high_priority_count,
      medium_priority_count,
      low_priority_count,
      completion_rate
    } = req.body;

    if (
      team_size === undefined || task_count === undefined ||
      high_priority_count === undefined || medium_priority_count === undefined ||
      low_priority_count === undefined || completion_rate === undefined
    ) {
      return res.status(400).json({ message: 'All feature fields are required' });
    }

    if (task_count < 1 || team_size < 1) {
      return res.status(400).json({
        message: 'Project must have at least 1 member and 1 task'
      });
    }

    const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5001';

    const flaskResponse = await fetch(`${FLASK_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        team_size,
        task_count,
        high_priority_count,
        medium_priority_count,
        low_priority_count,
        completion_rate
      })
    });

    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      return res.status(500).json({
        message: 'Prediction service error',
        error: errorData.error || 'Unknown error'
      });
    }

    const prediction = await flaskResponse.json();

    const today = new Date();
    const suggestedDeadline = new Date(today);
    suggestedDeadline.setDate(today.getDate() + prediction.predicted_days);

    res.status(200).json({
      predicted_days: prediction.predicted_days,
      confidence: prediction.confidence,
      suggested_deadline: suggestedDeadline.toISOString().split('T')[0]
    });

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        message: 'Prediction service is currently unavailable'
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;