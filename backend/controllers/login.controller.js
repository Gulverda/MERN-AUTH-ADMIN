import authService from '../services/login.service.js';

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const { token, role } = await authService.login(email, password); // Return role from login service
        res.status(200).json({ token, role });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(401).json({ message: 'Invalid Credentials' });
    }
}
