// models/training.js

const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    name: String,
    isReadyToBook: Boolean,
});

  const Training = mongoose.model("Training", trainingSchema);

  module.exports = Training;