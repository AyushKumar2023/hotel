const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const { getUserData, storeRecentSearchedCities } = require('../controller/userController.js');

// Define the router
const userRouter = express.Router();

// Add routes to the router
userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);

// Export the router
module.exports = userRouter;
