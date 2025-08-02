const express =require('express')
const bodyParser = require("body-parser");
const connectCloudinary=require('./config/cloudinary.js')
require('dotenv').config()
const cors=require ('cors')
const connectDB = require('./config/db.js');


connectDB()
connectCloudinary()

const { clerkMiddleware } = require('@clerk/express');
const { clerkWebHooks } = require('./controller/clerkwebhooks.js');
const  userRouter = require('./routes/userRoute.js');
const  hotelRouter  = require('./routes/hotelRoute.js');
const  roomRouter  = require('./routes/roomRoutes.js');
const  bookingRouter  = require('./routes/bookingRoutes.js');




const app=express()
app.use(cors()) //Enables cross-origin resource sharing
// app.use('/api/clerk', bodyParser.raw({ type: 'application/json' }));
app.post('/api/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebHooks);


// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to Listen
// app.use("/api/clerk",clerkWebHooks)
app.get('/',(req,res)=>{
    res.send("API is working aur Nodemon Lga diya h")
})

app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)



const PORT=process.env.PORT ||3000;
app.listen(PORT,()=>
    console.log(`Server Started at port ${PORT}`)
)