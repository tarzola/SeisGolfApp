require('dotenv').config();
const mongoose = require('mongoose');
const Round = require('./models/Round');

// Replace this array with your actual round data
const rounds = [
  {
    userId: "tj",
    score: 28,
    strokes: 63,
    holeStrokes: [8,7,7,7,7,5,7,6,9],
    timestamp: 1718388783631
  },
  {
    userId: "tj",
    score: 9,
    strokes: 45,
    holeStrokes: [5,5,5,4,6,7,6,3,4],
    timestamp: 1695507274479
  }
  // 🔁 Add as many rounds as you want here...
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  await Round.deleteMany({ userId: "tj" }); // Optional: clean old entries
  await Round.insertMany(rounds);
  console.log('✅ Rounds inserted');
  process.exit();
})
.catch(err => {
  console.error('❌ Error seeding data:', err);
  process.exit(1);
});
