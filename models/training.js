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
  name: String,
  addressOne: String,
  addressTwo: String,
  phone: String,
  bookings: [bookingSchema]
});

  const Training = mongoose.model("Training", trainingSchema);

  module.exports = Training;