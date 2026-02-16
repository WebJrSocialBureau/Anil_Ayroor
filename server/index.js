const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - [${new Date().toISOString()}]`);
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Anil Ayroor API is live' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blogs', blogRoutes);

// Database connection
const DB = process.env.MONGODB_URI;

if (!DB) {
  console.error('CRITICAL: MONGODB_URI is not defined in environment variables!');
} else {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch(err => {
      console.error('DB_CONNECTION_ERROR:');
      console.error('Message:', err.message);
      console.error('Stack:', err.stack);
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
