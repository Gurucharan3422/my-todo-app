const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Task routes
router.post('/', protect, createTask); // Create task
router.get('/', protect, getTasks); // Get tasks for the user

module.exports = router;