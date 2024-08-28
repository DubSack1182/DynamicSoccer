const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with "/auth"

// GET /auth/sign-up (show sign-up form)
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// POST /auth/sign-up (create user)
router.post('/sign-up', async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error('Password & confirmation do not match');
    }
    req.body.password = bcrypt.hashSync(req.body.password, 6);
    const user = await User.create(req.body);
    // "remember" only the user's _id in the session object
    req.session.user = { _id: user._id };
    req.session.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect('/trainings');
});

// POST /auth/login (login user)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = { _id: user._id };
      req.session.save();
      // Perhaps update to some other functionality
      return res.redirect('/trainings');
    } else {
      return res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/login', async (req, res) => {
  res.render('auth/login.ejs');
});



// GET /auth/trainings/new (show available sessions form)
router.get('/trainings/new', ensureLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('auth/training/new', {user, showNav: true});
  } catch (err) {
    console.log(err);
    res.redirect('/auth/training/new');
  }
});

// POST /auth/trainings/new (update new)
router.post('/trainings/new', ensureLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 6);
    }

    await user.save();
    res.redirect('/auth//trainings/new');
  } catch (err) {
    console.log(err);
    res.redirect('/auth//trainings/new');
  }
});

// GET /auth/logout (logout)
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;