const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog must have a title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'A blog must have content']
  },
  excerpt: {
    type: String,
    required: [true, 'A blog must have an excerpt']
  },
  image: {
    type: String,
    required: [true, 'A blog must have a featured image']
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A blog must have an author']
  },
  category: {
    type: String,
    default: 'Media'
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update updatedAt field
blogSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
