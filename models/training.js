// models/training.js

const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: String,
  service: 'Dynamic Soccer Training Sessions',
  isReadyToBook: Boolean,
  addressOne: '11536 Bailey Rd, Cornelius, NC  28031',
  addressTwo: '13789 Beatties Ford Rd, Huntersville, NC  28078',
  phone: '704.777.3112',
  sessions: [
    {
      _id: 1,
      name: 'One On One Dynamic Session',
      players: 'MAX 2 Players',
      price: 45.00,
      description: 'A personlized session for your player to develop their skills and game undestanding through experiential activities.'
    },
    {
      _id: 2,
      name: 'Small Group Dynamic Session',
      players: 'MAX 8 Players',
      price: 35.00,
      description: 'A personlized session that has technical focus, tactical awareness individually and as a team unit'
    },
    {
      _id: 3,
      name: 'Large Group/Team Dynamic Session',
      players: 'MAX 24 Players',
      price: 25.00,
      description: 'A personlized session for a large group that allows for specific teamwork and tactical awareness'
    },
    {
      _id: 4,
      name: 'Custom Group Dynamic Session',
      players: 'TO BE DETERMINED',
      price: 'TO BE DETERMINED',
      description: 'Discussed prior to final booking. Determine exact needs and wants.'
    },
    {
      _id: 5,
      name: 'Dynamic Summer Camp Registration',
      players: 'MAX 20 Players',
      price: 55.00,
      description: 'Dynamic Sessions that work individual skills, team building - morning sessions and afternoon sessions with lunch included!'
    },
  ]
});

  const Trainings = mongoose.model("Training", trainingSchema);

  module.exports = Training;