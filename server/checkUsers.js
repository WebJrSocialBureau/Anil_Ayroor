const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/userModel');

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE)
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({}, 'name email role');
    console.log('Current Users:');
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
