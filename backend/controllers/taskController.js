const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { taskName, description, expectedTime } = req.body;
  
  if (!taskName || !description || !expectedTime) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const task = new Task({
      taskName,
      description,
      expectedTime,
      user: req.user.id,
      status: 'pending',
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks };