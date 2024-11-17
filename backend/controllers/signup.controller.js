import { createUser } from '../services/signup.service.js';  // Correct import

// Controller method for handling user signup
export async function signup(req, res) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create user' });
    }
}
