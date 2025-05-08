// server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Import the projection route
const projectionRouter = require('./routes/projection');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projection', projectionRouter);

// Default route for sanity check
app.get('/', (req, res) => {
  res.send('Golf League Backend Running ✅');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
