
const Booking = require("../model/booking");
const Hotel = require("../model/hotel");
const Room = require("../model/room");

// Function to check availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, roomId }) => {
    try {
        const bookings = await Booking.find({
            room: roomId,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });
        return bookings.length === 0;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

// API to check availability of room
// POST /api/bookings/checkAvailability
exports.checkAvailabilityApi = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ room, checkInDate, checkOutDate });
        res.json({
            success: true,
            isAvailable
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// API to create new booking
// POST /api/bookings/book
exports.createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const userId = req.user._id;

        // Check room availability
        const isAvailable = await checkAvailability({ room, checkInDate, checkOutDate });

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available"
            });
        }

        // Get total price from room
        const roomDoc = await Room.findById(room).populate("hotel");
        let totalPrice = roomDoc.pricePerNight;

        // Calculate number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;

        // Create booking
        const Booking = await Booking.create({
            user: userId,
            room : roomDoc._id,
            hotel: roomDoc.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        res.json({
            success: true,
            message: "Booking created successfully",
            Booking
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to create booking"
        });
    }
};

// API to get all bookings for user
// GET /api/bookings/user
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({ user: userId }).populate("room hotel").sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch bookings"
        });
    }
};

// API to get bookings for hotel owner
// GET /api/bookings/hotel
exports.getHotelBookings = async (req, res) => {
    try {
        const hotelDoc = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotelDoc) {
            return res.json({
                success: false,
                message: "No hotel found"
            });
        }

        const bookings = await Booking.find({ hotel: hotelDoc._id }).populate("room hotel user").sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings
            }
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch hotel bookings"
        });
    }
};
