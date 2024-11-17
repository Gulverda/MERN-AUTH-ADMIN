import bcrypt from 'bcrypt';
import User from '../models/user.js';
import generateToken from '../utils/jwtUtils.js';

async function login(email, password) {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid password');
    }
    // Return both the token and the role
    return {
        token: generateToken(existingUser),
        role: existingUser.role,
    };
}

export default { login };
