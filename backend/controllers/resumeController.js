const Resume = require('../models/Resume');

// @desc    Get all resumes for logged in user
// @route   GET /api/resume
// @access  Private
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id });
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server error pulling resumes' });
    }
};

// @desc    Get specific resume
// @route   GET /api/resume/:id
// @access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the resume user
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Server error pulling resume' });
    }
};

// @desc    Create new resume
// @route   POST /api/resume/create
// @access  Private
const createResume = async (req, res) => {
    try {
        // Basic validation
        if (!req.body.title && !req.body.personal) {
            return res.status(400).json({ message: 'Please provide required fields' });
        }

        const newResume = await Resume.create({
            userId: req.user.id,
            title: req.body.title || 'Untitled Resume',
            personal: req.body.personal || {},
            education: req.body.education || [],
            experience: req.body.experience || [],
            projects: req.body.projects || [],
            skills: req.body.skills || {},
            leadership: req.body.leadership || [],
            config: req.body.config || {}
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create resume' });
    }
};

// @desc    Update resume
// @route   PUT /api/resume/update/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Make sure the logged in user matches the resume user
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Creates it if it doesn't exist, returns updated document
        );

        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update resume' });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resume/delete/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Make sure the logged in user matches the resume user
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await resume.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete resume' });
    }
};

module.exports = {
    getResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
};
