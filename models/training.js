// models/training.js

const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    name: String,
    players: String,
    price: Number,
    description: String,
  }
);

const trainingSchema = new mongoose.Schema({
  location: String,
  date: Date,
  type: {
    type: String,
    enum: ["Ball Manipulation", 'Finishing', 'Turning', 'Passing', 'Controling']
  },
  phone: String,
  price: Number,
  bookings: [bookingSchema],
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

  const Training = mongoose.model("Training", trainingSchema);

  module.exports = Training;