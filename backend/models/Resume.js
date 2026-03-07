const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        fullName: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        linkedin: { type: String },
        github: { type: String },

        education: [
            {
                university: { type: String },
                degree: { type: String },
                graduationYear: { type: String },
                coursework: { type: String },
            }
        ],

        experience: [
            {
                company: { type: String },
                role: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                description: [{ type: String }],
            }
        ],

        projects: [
            {
                projectName: { type: String },
                technologies: { type: String },
                description: [{ type: String }],
            }
        ],

        skills: {
            languages: { type: String },
            tools: { type: String },
            frameworks: { type: String },
        },

        leadership: [
            {
                position: { type: String },
                organization: { type: String },
                description: [{ type: String }],
            }
        ],

        // Additional Fields
        jobRole: { type: String },
        experienceLevel: { type: String },
        resumeTone: { type: String },
        aiGeneratedContent: { type: String },
        atsScore: { type: Number, default: 0 },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

// This ensures a user can have multiple resumes.
// They are linked via userId, so `Resume.find({ userId: req.user._id })` fetches all.
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
