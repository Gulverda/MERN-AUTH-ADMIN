import express from 'express';
import signupRoute from './routes/signup.route.js';
import loginRoute from './routes/login.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.js'; // Import the User model
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import createAdminAccount from './scripts/admin.js';

dotenv.config(); // Initialize dotenv to load .env file

const app = express();
const PORT = process.env.PORT || 5000;  // Use the PORT from the environment variable

// Middleware
app.use(bodyParser.json());  // Parse JSON bodies
app.use(cors());  // Enable CORS for all requests

// Connect to MongoDB using environment variable for URI
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!");
});

mongoose.connection.on("error", (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

// Create the admin account if necessary
createAdminAccount();

// Define your routes
app.use('/user', signupRoute);  // Forward /user/register to signupRoute
app.use('/auth', loginRoute);  // Forward /user/login to loginRoute

app.get('/admin/users', async (req, res) => {
  try {
      const users = await User.find(); // Fetch all users from the database
      res.json(users);  // Send the list of users as a JSON response
  } catch (error) {
      console.error('Error fetching users:', error); // Log the error to the console
      res.status(500).send('Error fetching users'); // Respond with error status
  }
});


// Catch-all 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).send('Route not found!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
