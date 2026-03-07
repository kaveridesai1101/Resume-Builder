// Pre-defined mocked keyword dictionaries based on tech roles for demonstration
const ATSRoleKeywords = {
    'frontend developer': ['react', 'javascript', 'css', 'html', 'tailwind', 'api', 'git', 'redux', 'typescript', 'vite', 'responsive', 'ui', 'ux'],
    'backend developer': ['node', 'express', 'mongodb', 'sql', 'database', 'api', 'rest', 'python', 'java', 'docker', 'aws', 'cache'],
    'software engineer': ['algorithms', 'data structures', 'git', 'agile', 'testing', 'debugging', 'ci/cd', 'cloud', 'architecture', 'system design'],
    'data scientist': ['python', 'machine learning', 'sql', 'pandas', 'statistics', 'deep learning', 'tensorflow', 'model', 'analysis', 'visualization'],
    // generic fallback words
    'default': ['teamwork', 'communication', 'leadership', 'problem solving', 'project management', 'agile', 'deliverables', 'optimized', 'scaled']
};

// @desc    Calculate ATS compatibility score
// @route   POST /api/ats/score
// @access  Private
const calculateATSScore = async (req, res) => {
    try {
        const { jobRole, resumeData } = req.body;

        if (!jobRole || !resumeData) {
            return res.status(400).json({ message: 'Job Role and Resume Data required.' });
        }

        // Step 1: Extract/Determine Keywords needed for the Job Role
        const normalizedRole = jobRole.trim().toLowerCase();

        let requiredKeywords = [];
        if (normalizedRole.includes('frontend') || normalizedRole.includes('front end') || normalizedRole.includes('react')) {
            requiredKeywords = ATSRoleKeywords['frontend developer'];
        } else if (normalizedRole.includes('backend') || normalizedRole.includes('back end') || normalizedRole.includes('node')) {
            requiredKeywords = ATSRoleKeywords['backend developer'];
        } else if (normalizedRole.includes('data') || normalizedRole.includes('analyst')) {
            requiredKeywords = ATSRoleKeywords['data scientist'];
        } else if (normalizedRole.includes('software')) {
            requiredKeywords = ATSRoleKeywords['software engineer'];
        } else {
            requiredKeywords = ATSRoleKeywords['default'];
        }

        // Step 2: Flatten Resume Data to text block to scan for keywords
        const flattenResumeText = (data) => {
            let text = '';
            if (data.skills) {
                text += Object.values(data.skills).join(' ') + ' ';
            }
            if (data.experience) {
                data.experience.forEach(exp => {
                    text += `${exp.role} ${exp.company} ${exp.description.join(' ')} `;
                });
            }
            if (data.projects) {
                data.projects.forEach(proj => {
                    text += `${proj.title} ${proj.technologies} ${proj.description.join(' ')} `;
                });
            }
            if (data.education) {
                data.education.forEach(edu => {
                    text += `${edu.degree} ${edu.relevantCoursework} `;
                });
            }
            return text.toLowerCase();
        };

        const resumeText = flattenResumeText(resumeData);

        // Step 3: Count Matched Keywords
        const matchedKeywords = [];
        const missingKeywords = [];

        requiredKeywords.forEach(keyword => {
            // Very basic substring match. Regex \b boundry could be used for whole word matches
            const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'g');
            if (resumeText.match(keywordRegex)) {
                matchedKeywords.push(keyword);
            } else {
                missingKeywords.push(keyword);
            }
        });

        // Step 4: Calculate ATS Score using formula (Matched Keywords / Total Keywords) × 100
        let keywordScorePercent = 0;
        if (requiredKeywords.length > 0) {
            keywordScorePercent = (matchedKeywords.length / requiredKeywords.length) * 100;
        }

        // Weighting: Keywords represent 70% of the score. Formatting/Basic structure represents 30%.
        let structuralScore = 0;
        if (resumeData.experience && resumeData.experience.length > 0) structuralScore += 10;
        if (resumeData.education && resumeData.education.length > 0) structuralScore += 10;
        if (resumeData.skills && (resumeData.skills.languages || resumeData.skills.frameworks)) structuralScore += 10;

        const overallScore = Math.min(Math.round((keywordScorePercent * 0.70) + structuralScore), 100);

        // Formatted Payload return
        res.status(200).json({
            overallScore: overallScore,
            totalKeywordsAnalyzed: requiredKeywords.length,
            matchedCount: matchedKeywords.length,
            skillsMatch: matchedKeywords,
            missingKeywords: missingKeywords,
            breakdown: {
                keywordOptimization: Math.round(keywordScorePercent),
                structure: structuralScore * 3.33 // scaled out of 100
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to calculate ATS score' });
    }
};

module.exports = {
    calculateATSScore,
};
