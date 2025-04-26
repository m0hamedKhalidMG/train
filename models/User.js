const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Train Operator', 'Station Manager', 'Passenger'], 
    default: 'Passenger' 
  }
});

module.exports = mongoose.model('User', UserSchema);
