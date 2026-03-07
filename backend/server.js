require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/ats', require('./routes/atsRoutes'));

const { generatePDF } = require('./controllers/pdfController');
const { protect } = require('./middleware/authMiddleware');
app.post('/api/resume/pdf', protect, generatePDF);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
