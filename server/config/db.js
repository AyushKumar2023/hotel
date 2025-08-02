const mongoose  = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("DB connected"));

    await mongoose.connect(`${process.env.MONGODB_URL}/Booking`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
