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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blogs', blogRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Database connection
const DB = process.env.MONGODB_URI.replace('<username>', process.env.DB_USER || 'admin').replace('<password>', process.env.DB_PASSWORD || 'password');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log('DB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
