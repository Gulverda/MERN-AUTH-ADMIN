import express from 'express';
import { signup } from '../controllers/signup.controller.js';  // Correct import

const router = express.Router();

// Handle POST requests for user registration
router.post('/register', signup);

export default router;
