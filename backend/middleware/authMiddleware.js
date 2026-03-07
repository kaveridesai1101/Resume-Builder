const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            if (!token || token === 'undefined' || token === 'null') {
                console.log('Auth Failure: Invalid token format in header');
                return res.status(401).json({ message: 'Not authorized, token invalid' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.log('Auth Failure: User not found for token');
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            console.log(`Auth Success: User ${req.user.email} verified`);
            next();
        } catch (error) {
            console.error('Auth Error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.log('Auth Failure: No Bearer token provided');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
