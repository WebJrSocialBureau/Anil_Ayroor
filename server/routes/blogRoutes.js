const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  }
});

// Upload route
router.post('/upload', upload.single('image'), (req, res) => {
  console.log('UPLOAD_REQUEST [IMAGE]:', req.file ? req.file.filename : 'No file');
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ status: 'success', data: { url: imageUrl } });
});

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({ status: 'fail', message: 'User no longer exists' });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid token' });
  }
};

// Middleware to restrict access to roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'fail', message: 'You do not have permission' });
    }
    next();
  };
};

// Public routes
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit * 1 || 0;
    const query = Blog.find().sort('-createdAt').populate('author', 'name');
    if (limit > 0) query.limit(limit);
    
    const blogs = await query;
    res.status(200).json({ status: 'success', results: blogs.length, data: { blogs } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ status: 'fail', message: 'No blog found with that ID' });
    res.status(200).json({ status: 'success', data: { blog } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      author: req.user._id
    });
    res.status(201).json({ status: 'success', data: { blog: newBlog } });
  } catch (err) {
    console.error('SERVER_ERROR [BLOG_CREATE]:', err.message);
    if (err.name === 'ValidationError') {
      console.error('Validation Errors:', Object.values(err.errors).map(val => val.message));
    }
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!blog) return res.status(404).json({ status: 'fail', message: 'No blog found with that ID' });
    res.status(200).json({ status: 'success', data: { blog } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ status: 'fail', message: 'No blog found with that ID' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
