import crypto from 'crypto';

// Generate a static secret key on server start
const secretKey = crypto.randomBytes(64).toString('hex');

export default secretKey;
