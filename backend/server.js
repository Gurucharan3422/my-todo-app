const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Basic Route
app.get('/', (req, res) => {
  res.send('To-Do App Backend is running!');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => { // Bind to 0.0.0.0
  console.log(`Server is running on port ${PORT}`);
});