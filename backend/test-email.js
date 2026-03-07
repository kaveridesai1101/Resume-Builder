const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function testEmail() {
    console.log('--- Testing SMTP Configuration ---');
    console.log('User:', process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self
        subject: 'AI Resume Builder - SMTP Test',
        text: 'If you receive this, your SMTP configuration is working correctly! 🚀',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('SUCCESS: Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('ERROR sending email:', error.message);
        console.log('\n--- Troubleshooting Tips ---');
        console.log('1. Ensure "2-Step Verification" is ON in your Google Account.');
        console.log('2. Ensure you are using an "App Password" (16 characters), NOT your regular password.');
        console.log('3. Check if your firewall or network blocks SMTP ports.');
    }
}

testEmail();
