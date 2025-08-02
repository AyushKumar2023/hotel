const express=require('express')
const { upload } = require('../middleware/uploadMiddleware')
const { protect } = require('../middleware/authMiddleware')
const { createRoom, getRooms, getOwnerRooms, toggleRoomAvailability } = require('../controller/roomController')
const roomRouter=express.Router()

roomRouter.post('/',upload.array('images',4),protect,createRoom)
roomRouter.get('/',getRooms)
roomRouter.get('/owner',protect,getOwnerRooms)
roomRouter.post('/toggle-availability',protect,toggleRoomAvailability)
module.exports=roomRouter
