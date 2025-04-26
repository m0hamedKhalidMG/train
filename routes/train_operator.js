const express = require("express");
const router = express.Router();
const Train = require("../models/train");
const { requireRole } = require('./Middleware');

router.get('/',requireRole('Train Operator'), async(req, res) => {
  try {
    const trains = await Train.find(); // Fetch all trains
    res.render('train-operator', { trains });
  } catch (err) {
    console.error('Error fetching trains:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/schedule',requireRole('Train Operator'), async (req, res) => {
  const { train_no, origin, destination, departure, arrival, status } = req.body;

  const newTrain = new Train({
    train_no,
    origin,
    destination,
    departure,
    arrival,
    status,
  });

  try {
    await newTrain.save(); // Save the new train to the database
    res.redirect('/train-operator');
  } catch (err) {
    console.error('Error saving train:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
