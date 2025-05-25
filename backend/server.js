const express = require('express');
const { scanUrl, scanEmail } = require('./controllers/scanController');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// Middleware
dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Phisbusters API' });
});

// Scan endpoints
app.post('/api/scan/url', scanUrl);
app.post('/api/scan/email', scanEmail);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});