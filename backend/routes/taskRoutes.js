const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Task routes
router.post('/', protect, createTask); // Create task
router.get('/', protect, getTasks); // Get all tasks
router.get('/:id', protect, getTaskById); // Get a specific task by ID
router.put('/:id', protect, updateTask); // Update task
router.delete('/:id', protect, deleteTask); // Delete task

module.exports = router;