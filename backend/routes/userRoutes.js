const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // POST route for registration
router.post('/login', loginUser); // POST route for login

// Protected routes (requires authentication)
router.get('/profile', protect, getUserProfile); // GET route for profile (protected)
router.put('/profile', protect, updateUserProfile); // PUT route for updating profile (protected)

module.exports = router