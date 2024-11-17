import User from '../models/user.js';  // Correct import
import bcrypt from 'bcrypt';

export async function createUser(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'user',
    });

    const savedUser = await createdUser.save();
    return savedUser;
}
