const express=require('express')
const { protect } = require('../middleware/authMiddleware');

const { checkAvailabilityApi, createBooking, getUserBookings, getHotelBookings } = require('../controller/bookingController')
const bookingRouter=express.Router()

bookingRouter.post('/check-availability',checkAvailabilityApi)
bookingRouter.post('/book',protect,createBooking);
bookingRouter.get('/user',protect,getUserBookings);
bookingRouter.get('/hotel',protect,getHotelBookings);
module.exports=bookingRouter