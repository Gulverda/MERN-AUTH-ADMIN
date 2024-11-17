import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-static-secret-key';  // Fetch secret key from .env file

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });  // Use JWT_SECRET from .env
}

export default generateToken;
