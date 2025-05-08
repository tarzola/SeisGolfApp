const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  userId: String,
  score: Number,
  strokes: Number,
  holeStrokes: [Number],
  timestamp: Number
});

module.exports = mongoose.model('Round', roundSchema);
