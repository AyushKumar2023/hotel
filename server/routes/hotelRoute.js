const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const { registerHotel } = require('../controller/hotelController.js');

const hotelRouter = express.Router();

hotelRouter.post('/', protect ,registerHotel);

module.exports = hotelRouter;
