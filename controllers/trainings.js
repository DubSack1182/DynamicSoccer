const express = require('express');
const router = express.Router();
const Training = require('../models/training');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const { Types } = require('mongoose');

// All paths start with /trainings...

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
  const types = Training.schema.path('type').enumValues;
  res.render('trainings/new.ejs', {types});
});

// POST /trainings - Create a new training session
router.post('/', ensureLoggedIn, async (req, res) => { 
  try {
    req.body.coach = req.user._id;
    req.body.date += 'T00:00';
    await Training.create(req.body);
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

// GET /trainings/:id (show) - Show details of coaches sessions
router.get('/:id', ensureLoggedIn, async (req, res) => { 
  try {
    const training = await Training.findById(req.params.id);
    res.render('trainings/show.ejs', { training }); 
  } catch (err) {
    console.log(err);
    res.redirect('/trainings');
  }
});

// DELETE /trainings/:id (delete)
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    await Training.findOneAndDelete({_id: req.params.id, coach: req.user._id});
    res.redirect('/trainings');
  } catch (err) {
    console.log(err);
    res.redirect('/trainings');
  }
});

module.exports = router;