const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    name: String,
    players: String,
    price: Number,
    description: String,
  }
);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userBookings: [bookingSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
