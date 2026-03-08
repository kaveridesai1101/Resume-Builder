const sendEmail = require('./utils/emailService');
const dotenv = require('dotenv');
dotenv.config();

async function debugRegister() {
    console.log('--- Debugging Registration Email Flow ---');
    console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

    const testUser = {
        name: 'Test Debug User',
        email: process.env.EMAIL_USER, // Send to self for testing
        otp: '123456'
    };

    try {
        console.log('Attempting to send verification email...');
        const result = await sendEmail({
            email: testUser.email,
            subject: 'Verify Your Email - AI Resume Builder (Debug Test)',
            message: `Hello ${testUser.name},\n\nYour 6-digit verification code is: ${testUser.otp}\n\nThis code will expire in 10 minutes.`,
        });

        if (result) {
            console.log('SUCCESS: sendEmail function returned true.');
        } else {
            console.log('FAILURE: sendEmail function returned false.');
        }
    } catch (error) {
        console.error('CRITICAL ERROR in debugRegister:', error.message);
    }
}

debugRegister();
