const User = require('../model/user.js');
const Hotel = require('../model/hotel.js');
// const Room = require('../model/room');
// const cloudinary = require('cloudinary').v2;

exports.registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        // Check if user already registered a hotel
        const existingHotel = await Hotel.findOne({ owner });

        if (existingHotel) {
            return res.json({
                success: false,
                message: "Hotel already registered"
            });
        }

        // Create new hotel
        await Hotel.create({ name, address, contact, city, owner });

        // Update user's role
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        res.json({
            success: true,
            message: "Hotel registered successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
