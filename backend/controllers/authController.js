const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const email = req.body.email?.toLowerCase().trim();

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        console.log(`\n========================================`);
        console.log(`[OTP] Registration OTP for ${email}: ${otp}`);
        console.log(`========================================\n`);

        const user = await User.create({
            name,
            email,
            password,
            isVerified: false,
            otp,
            otpExpires,
        });

        if (user) {
            // Send Verification Email (non-blocking - don't let email failure kill registration)
            sendEmail({
                email: user.email,
                subject: 'Verify Your Email - AI Resume Builder',
                message: `Hello ${user.name},\n\nYour 6-digit verification code is: ${otp}\n\nThis code will expire in 10 minutes.`,
            }).then(() => {
                console.log(`[EMAIL] Verification email sent to ${user.email}`);
            }).catch((emailErr) => {
                console.error(`[EMAIL ERROR] Failed to send to ${user.email}:`, emailErr.message);
                console.log(`[FALLBACK] Use the OTP from the console log above to verify.`);
            });

            res.status(201).json({
                message: 'Registration successful. Please verify your email.',
                email: user.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify Email
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const email = req.body.email?.toLowerCase().trim();
        const { otp } = req.body;

        console.log(`[VERIFY] Attempting verification for ${email} with OTP: ${otp}`);

        const user = await User.findOneAndUpdate(
            {
                email,
                otp,
                otpExpires: { $gt: Date.now() }
            },
            {
                $set: { isVerified: true },
                $unset: { otp: '', otpExpires: '' }
            },
            { new: true }
        );

        if (!user) {
            console.log(`[VERIFY] No matching user found for email: ${email}`);
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        console.log(`[VERIFY] Email verified successfully for ${user.email}`);

        res.status(200).json({
            message: 'Email verified successfully. You can now log in.',
            token: generateToken(user._id),
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error('[VERIFY ERROR]', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const email = req.body.email?.toLowerCase().trim();
        const { password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (!user.isVerified) {
                return res.status(401).json({ message: 'Please verify your email to log in' });
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email?.toLowerCase().trim();
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        console.log(`\n========================================`);
        console.log(`[OTP] Password Reset OTP for ${email}: ${otp}`);
        console.log(`========================================\n`);

        // Non-blocking email send
        sendEmail({
            email: user.email,
            subject: 'Password Reset OTP - AI Resume Builder',
            message: `You requested a password reset. Your OTP is: ${otp}\n\nIf you did not request this, please ignore this email.`,
        }).then(() => {
            console.log(`[EMAIL] Password reset email sent to ${user.email}`);
        }).catch((emailErr) => {
            console.error(`[EMAIL ERROR] Failed to send to ${user.email}:`, emailErr.message);
        });

        res.status(200).json({ message: 'Password reset OTP sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const email = req.body.email?.toLowerCase().trim();
        const { otp, newPassword } = req.body;

        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful. You can now log in.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
};
