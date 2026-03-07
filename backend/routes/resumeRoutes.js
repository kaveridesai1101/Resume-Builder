const express = require('express');
const router = express.Router();
const {
    getResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
} = require('../controllers/resumeController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getResumes);
router.route('/create').post(protect, createResume);
router.route('/:id').get(protect, getResumeById);
router.route('/update/:id').put(protect, updateResume);
router.route('/delete/:id').delete(protect, deleteResume);

module.exports = router;
