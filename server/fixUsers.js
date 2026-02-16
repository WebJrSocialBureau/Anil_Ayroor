const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/userModel');

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE)
  .then(async () => {
    console.log('Connected to MongoDB');
    const result = await User.updateMany({}, { role: 'admin' });
    console.log(`Updated ${result.modifiedCount} users to 'admin' role.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
