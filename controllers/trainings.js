const express = require('express');
const router = express.Router();
const Training = require('../models/training');
const Comment = require('../models/comment');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET /trainings (index)
router.get('/', ensureLoggedIn, async (req, res) => {
  try {
    const trainings = await Training.find({});
    res.render('training/index', { training, showNav: true });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// GET /trainings/new - Show form to book session
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('trainings/new', { showNav: true });
});

// POST /trainings - Create a new booking
router.post('/', ensureLoggedIn, async (req, res) => { 
  try {
    const training = new Training;
    await training.save();
    res.redirect('/trainings');
  } catch (err) {
    console.log(err);
    res.redirect('/trainings/new');
  }
});

// GET /trainings/:id (show) - Show details booked sessions
router.get('/:id', ensureLoggedIn, async (req, res) => {  // ensureLoggedIn to protect the route
  try {
    const training = await train.findById(req.params.id).populate('createdBy');
    res.render('trainings/index.ejs', { train, showNav: true }); 
  } catch (err) {
    console.log(err);
    res.redirect('/trainings');
  }
});

// DELETE /trainings/:id (delete)
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train.createdBy.equals(req.session.user._id)) {
      return res.redirect('/trainings');
    }
    await Train.findByIdAndDelete(req.params.id);
    res.redirect('/trainings');
  } catch (err) {
    console.log(err);
    res.redirect('/trainings');
  }
});

module.exports = router;