require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');


const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Training = require("./models/training.js");

// Morgan for logging HTTP requests
app.use(morgan('dev'));
// Serves static assets to the browser
app.use(express.static('public'));
// Middleware to parse URL-encoded data from forms
// express.urlencoded is what creates req.body
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Require the middleware that adds the user doc to the req & the res.locals objects
const addUserToReqAndLocals = require('./middleware/addUserToReqAndLocals');
// Be sure to mount after the session middleware above
app.use(addUserToReqAndLocals);


// Routes/Controllers

const ensureLoggedIn = require('./middleware/ensureLoggedIn');

// '/auth' is a "starts with" path that all paths
// within authCtrl are appended to
app.use('/auth', require('./controllers/auth'));
app.use('/todos', require('./controllers/todos'));
// If you wanted to protect ALL routes 
// app.use('/todos', ensureLoggedIn, require('./controllers/todos'));


// GET / (root/landing page)
app.get('/', async (req, res) => {
  res.render('home.ejs');
});

// GET /trainings
app.get('/trainings', async (req, res) => {
  const allTrainings = await Training.find();
  res.render('trainings/index.ejs', {trainings: allTrainings });
});

// GET /trainings/new
app.get('/trainings/new', (req, res) => {
  res.render('trainings/new.ejs');
});

// POST /trainings
app.post('/training', async (req, res) => {
  if (req.body.isReadyToBook === 'on') {
    req.body.isReadyToBook = true;
  } else {
    req.body.isReadyToBook = false;
  }
  await Training.create(req.body);
  res.redirect('trainings/new');
});



// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
// An alternative to above
// const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
