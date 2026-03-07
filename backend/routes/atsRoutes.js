const express = require('express');
const router = express.Router();
const {
    calculateATSScore
} = require('../controllers/atsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/score').post(protect, calculateATSScore);

module.exports = router;
