const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Check if SMTP config exists
    const hasConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;

    if (!hasConfig) {
        console.log('-------------------------------------------');
        console.log(`[EMAIL MOCK] To: ${options.email}`);
        console.log(`[EMAIL MOCK] Subject: ${options.subject}`);
        console.log(`[EMAIL MOCK] Message: ${options.message}`);
        console.log('-------------------------------------------');
        return true;
    }

    console.log(`[SMTP] Attempting to send via: ${process.env.EMAIL_USER} (Pass: ${process.env.EMAIL_PASS ? 'AVAILABLE' : 'MISSING'})`);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your preferred service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"AI Resume Builder" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
                    <h2 style="color: #0d9488;">AI Resume Builder</h2>
                    <p>${options.message.replace(/\n/g, '<br>')}</p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #64748b;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[${new Date().toLocaleTimeString()}] OTP Email sent successfully to: ${options.email}`);
        return true;
    } catch (error) {
        console.error(`[${new Date().toLocaleTimeString()}] Email Send Error for ${options.email}:`, error.message);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
