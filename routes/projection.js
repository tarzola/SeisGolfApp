// routes/projection.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load mock round data from local JSON file
const dataPath = path.join(__dirname, '../data/mockRounds.json');
const roundsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

router.post('/', (req, res) => {
  const { userId, target, remainingRounds } = req.body;

  // Get user's past rounds
  const userRounds = roundsData.filter(r => r.userId === userId);
  if (userRounds.length === 0) {
    return res.status(404).json({ error: 'User not found or no rounds recorded.' });
  }

  const currentAvg = userRounds.reduce((sum, r) => sum + r.score, 0) / userRounds.length;

  // Example logic — you'd eventually calculate this based on real standings
  let neededAvg;
  let label;

  if (target === 'top3') {
    neededAvg = 38;
    label = 'Top 3 seed';
  } else if (target === 'captain') {
    neededAvg = 40;
    label = 'Captain status';
  } else {
    neededAvg = 39;
    label = 'General goal';
  }

  const message = `To reach ${label}, you must average ${neededAvg} over the next ${remainingRounds} rounds.`;

  res.json({
    currentAverage: Math.round(currentAvg * 100) / 100,
    neededAverage: neededAvg,
    remainingRounds,
    possible: neededAvg >= 18 && neededAvg <= 120,
    message
  });
});

module.exports = router;
