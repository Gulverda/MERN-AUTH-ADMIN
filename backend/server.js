import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import signupRoute from './routes/signup.route.js';
import loginRoute from './routes/login.route.js';
import createAdminAccount from './scripts/admin.js';
import User from './models/user.js';

dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://https://mern-auth-admin.onrender.com', // Deployed frontend domain
];


// Middleware
app.use(bodyParser.json());
// Allow requests from specific origins
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow required methods only
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Enable cookies for cross-origin requests (optional)
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

// Create admin account on server start
createAdminAccount();

// Routes
app.use('/user', signupRoute);
app.use('/auth', loginRoute);

// Admin route to fetch all users
app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  console.log('Running in development mode');
}

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
