const express = require('express');
const router = express.Router();
const Training = require('../models/training');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET /trainings (index)
router.get('/', ensureLoggedIn, async (req, res) => {
  try {
    const trainings = await Training.find({coach: req.user._id}).populate('bookings');
    res.render('trainings/index.ejs', { trainings });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// GET /trainings/new - Show form to create a training session
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('trainings/new.ejs', { showNav: true });
});

// POST /trainings - Create a new booking
router.post('/create', ensureLoggedIn, async (req, res) => { 
  try {
const bookings = [
  {
    name: 'One On One Dynamic Session',
    players: 'MAX 2 Players',
    price: 45,
    description: 'A personlized session for your player to develop their skills and game undestanding through experiential activities.'
  },
  {
    name: 'Small Group Dynamic Session',
    players: 'MAX 8 Players',
    price: 35,
    description: 'A personlized session that has technical focus, tactical awareness individually and as a team unit'
  },
  {
    name: 'Large Group/Team Dynamic Session',
    players: 'MAX 24 Players',
    price: 25,
    description: 'A personlized session for a large group that allows for specific teamwork and tactical awareness'
  },
  {
    name: 'Custom Group Dynamic Session',
    players: 'TO BE DETERMINED',
    price: 45,
    description: 'Discussed prior to final booking. Determine exact needs and wants.'
  },
  {
    name: 'Dynamic Summer Camp Registration',
    players: 'MAX 20 Players',
    price: 55,
    description: 'Dynamic Sessions that work individual skills, team building - morning sessions and afternoon sessions with lunch included!'
  },
]
  req.body.bookings = bookings
  console.log(req.body)
    const training = await Training.create(req.body);
    console.log(training)
    res.redirect('/trainings');
  } catch (err) {
    console.log(err);
    res.redirect('/trainings/new');
  }
});

// POST /trainings
router.post('/training', ensureLoggedIn, async (req, res) => {
  if (req.body.isReadyToBook === 'on') {
    req.body.isReadyToBook = true;
  } else {
    req.body.isReadyToBook = false;
  }
 await Training.create(req.body);
 res.redirect('trainings/new.ejs');
});

// GET /trainings/:id (show) - Show details booked sessions
router.get('/:id', ensureLoggedIn, async (req, res) => {  // ensureLoggedIn to protect the route
  try {
    const training = await Training.findById(req.params.id).populate('createdBy');
    res.render('trainings/index.ejs', { train, showNav: true }); 
  } catch (err) {
    console.log(err);
    res.redirect('/trainings');
  }
});

// DELETE /trainings/:id (delete)
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const train = await Training.findById(req.params.id);
    if (!train.createdBy.equals(req.session.user._id)) {
      return res.redirect('/trainings');
    }
    await Training.findByIdAndDelete(req.params.id);
    res.redirect('/trainings');
  } catch (err) {
    console.log(err);
    res.redirect('/trainings');
  }
});

module.exports = router;