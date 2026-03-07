const express = require('express');
const router = express.Router();
const {
    generateContent
} = require('../controllers/aiController');

const { protect } = require('../middleware/authMiddleware');

router.route('/generate').post(protect, generateContent);

module.exports = router;
