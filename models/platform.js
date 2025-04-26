const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
  platform_no: {
    type: Number,
    required: true,
  },
  train_no: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Occupied", "Vacant"],
    required: true,
  },
});

const Platform = mongoose.model("Platform", platformSchema);

module.exports = Platform;
