import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Call dotenv.config() at the top of your file to load .env variables

const mongodbUri = process.env.MONGODB_URI;  // Get MongoDB URI from environment variables

if (!mongodbUri) {
  console.error("MongoDB URI is not defined in .env file");
  process.exit(1);  // Exit if URI is not found
}

// Connect to MongoDB using the URI from the .env file
mongoose.connect(mongodbUri);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

export default mongoose;
