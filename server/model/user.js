const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Clerk user ID
      required: true,
    },
    username: {
      type: String,
      required: true,
      // trim: true,
    },
    email: {
      type: String,
      required: true,
      // trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "hotelOwner"],
      default: "user",
    },
    recentSearchedCities: [{
      type: String,
      default: [],
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); // ✅ Capitalized
