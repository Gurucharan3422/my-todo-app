const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const taskRoutes = require('./routes/taskRoutes'); // Import taskRoutes (if applicable)
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json()); // Body parsing middleware
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Routes
app.use('/api/users', userRoutes); // Auth routes (login, register, etc.)
app.use('/api/tasks', taskRoutes); // Task routes (if applicable)

// Error Handling Middleware
app.use(notFound); // Handle unknown routes
app.use(errorHandler); // Handle errors

// Basic Route
app.get('/', (req, res) => {
  res.send('To-Do App Backend is running!');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});