const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  expectedTime: {
    type: Number, // In minutes or hours
    required: true,
  },
  actualTime: {
    type: Number, // In minutes or hours
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;