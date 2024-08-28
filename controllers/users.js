const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Training = require('../models/training')
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with "/auth"

// GET /auth/sign-up (show sign-up form)
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// GET /userId/bookings (get bookings)
router.get('/:userId/bookings', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('auth/training/new', {user, showNav: true});
  } catch (err) {
    console.log(err);
    res.redirect('/');
}
});

// PUT /userId/bookings (put bookings in to user)
router.get('/:userId/book/:bookingId', ensureLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const trainings = await Training.find({}).populate('bookings')
    const booking = trainings[0].bookings.filter((booking) => booking._id === req.params.bookingId)
    user.bookings.push(booking[0])
    user.save()
    res.redirect(`/users/${req.session.user._id}/bookings`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});
module.exports = router;