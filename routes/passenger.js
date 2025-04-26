const express = require('express');
const router = express.Router();
const Train = require('../models/train'); // Train model
const { requireRole } = require('./Middleware');

// Passenger dashboard route
router.get('/',requireRole('Passenger'), async (req, res) => {
  try {
    // Fetch trains and unique stations from the database
    const trains = await Train.find({});

    // Render the EJS file and pass train and station data
    res.render('passenger', { trains });
  } catch (err) {
    console.error('Error fetching trains or stations:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Book a ticket route
router.post('/book',requireRole('Passenger'), async (req, res) => {
  const { origin, destination, date, time, seats, price } = req.body;

  try {
    // Save booking to database or perform booking logic
    console.log('Booking Details:', { origin, destination, date, time, seats, price });
    res.redirect('/passenger');
  } catch (err) {
    console.error('Error booking ticket:', err);
    res.status(500).send('Failed to book ticket');
  }
});

module.exports = router;
