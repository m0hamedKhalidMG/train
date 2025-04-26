const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  train_no: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  status: { type: String, required: true, enum: ['On Time', 'Delayed', 'Cancelled'], default: 'On Time' }, // Added status
});

const Train = mongoose.model('Train', TrainSchema);

module.exports = Train;
