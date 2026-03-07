const Groq = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Standardized Model for Free high-quality responses
const MODEL = 'llama-3.3-70b-versatile';

// Initialize Groq Cloud Client
const groq = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here'
    ? new Groq({ apiKey: process.env.GROQ_API_KEY })
    : null;

/**
 * @desc    Generate AI Resume Content (Summary, Skills, Rewrite)
 * @route   POST /api/ai/generate
 * @access  Private
 */
const generateContent = async (req, res) => {
    try {
        const { type, jobRole, experienceLevel, tone, data } = req.body;

        if (!jobRole || !type) {
            return res.status(400).json({ message: 'Missing required parameters (type, jobRole)' });
        }

        let prompt;
        const rules = `
Rules:
- Return ONLY a valid JSON object.
- CRITICAL: Every single bullet point (subpoint) MUST be exactly 2 lines of text (approx 40-50 words). 
- DO NOT provide short points. Each point must be a substantial, detailed explanation.
- Use the "Lindy" style: high-impact, prestigious, and professionally elegant language.
- Fix all grammatical errors and focus on quantifiable achievements.
- Follow ATS-friendly formatting.`;

        switch (type) {
            case 'objective':
                prompt = `Write a 2-3 sentence prestigious career objective optimized for ATS for a ${jobRole} (${experienceLevel}). Tone: ${tone}. 
                ${data ? `Build upon this existing info: "${data}".` : ''} 
                Return JSON: { "objective": "string" }. ${rules}`;
                break;

            case 'skills':
                prompt = `Provide relevant technical skills for ${jobRole} (${experienceLevel}). 
                Include both the skill name and a brief high-impact proficiency description for each category.
                Return JSON: { "languages": "string", "frameworks": "string", "tools": "string" }. ${rules}`;
                break;

            case 'suggest_projects':
                prompt = `Suggest 3 prestigious and distinct project ideas for a ${experienceLevel} level ${jobRole} resume. 
                This can be from ANY field (e.g., Tech, Marketing, Healthcare, Business, Arts, etc.).
                ${data ? `Incorporate these existing project ideas or themes: "${data}".` : ''}
                Each project must have 3 substantial description bullet points, each at least 2 lines long (40-50 words).
                Return JSON: { "projects": [ { "title": "Project Title", "technologies": "Core Skills/Tools Used", "description": ["bullet1", "bullet2", "bullet3"] } ] }. ${rules}`;
                break;

            case 'suggest_experience':
                prompt = `Suggest 3 high-profile professional roles for a ${experienceLevel} level ${jobRole} resume. 
                Support ANY professional domain or background.
                ${data ? `Context/Previous info: "${data}".` : ''}
                Each role must have 3 prestigious description bullets, each exactly 2 lines long (40-50 words).
                Return JSON: { "experience": [ { "company": "Organization Name", "role": "Position Title", "location": "City, State", "startDate": "date", "endDate": "date", "description": ["bullet1", "bullet2", "bullet3"] } ] }. ${rules}`;
                break;

            case 'suggest_education':
                prompt = `Suggest 3 elite educational background entries for a ${experienceLevel} level ${jobRole} resume across any academic discipline. 
                Return JSON: { "education": [ { "institution": "University/Institution Name", "degree": "Degree/Certification Name", "location": "City, State", "startDate": "date", "endDate": "date", "gpa": "3.8", "relevantCoursework": "Key Subjects" } ] }. ${rules}`;
                break;

            case 'suggest_leadership':
                prompt = `Suggest 3 high-impact leadership or extracurricular roles for a ${experienceLevel} level ${jobRole} resume from any background or interest area. 
                Each role must have 2 substantial description bullets, each exactly 2 lines long (40-50 words).
                Return JSON: { "leadership": [ { "organization": "Organization Name", "role": "Role Title", "location": "Location", "startDate": "date", "endDate": "date", "description": ["bullet1", "bullet2"] } ] }. ${rules}`;
                break;

            case 'rewrite_project':
                prompt = `Rewrite and expand this project/activity point for ${jobRole} into 3 substantial 2-line (40-50 words), high-impact professional achievements. 
                Ensure perfect grammar and prestigious vocabulary regardless of the field.
                Original: "${data}". 
                Return JSON: { "description": ["transformed_bullet1", "transformed_bullet2", "transformed_bullet3"] }. ${rules}`;
                break;

            case 'rewrite_experience':
                prompt = `Rewrite and expand this work experience point for ${jobRole} into 3 prestigious 2-line (40-50 words) achievements. 
                Focus on high-level metrics and professional elegance for any industry.
                Original: "${data}". 
                Return JSON: { "description": ["transformed_bullet1", "transformed_bullet2", "transformed_bullet3"] }. ${rules}`;
                break;

            default:
                return res.status(400).json({ message: 'Invalid generation type' });
        }

        // 1. Attempt Groq AI Generation
        if (groq) {
            try {
                console.log(`[Groq AI] Requesting ${type} for ${jobRole}`);
                const completion = await groq.chat.completions.create({
                    messages: [
                        { role: 'system', content: 'You are a world-class professional resume writer and career coach specializing in prestigious, high-density content.' },
                        { role: 'user', content: prompt }
                    ],
                    model: MODEL,
                    temperature: 0.5,
                    max_tokens: 1024,
                });

                let aiText = completion.choices[0]?.message?.content?.trim();

                if (aiText) {
                    // Extract JSON if AI wraps it in markdown blocks
                    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) aiText = jsonMatch[0];

                    try {
                        const parsed = JSON.parse(aiText);
                        return res.json({ result: parsed });
                    } catch (parseError) {
                        return res.json({ result: aiText }); // Return raw if JSON fails
                    }
                }
            } catch (aiError) {
                console.warn('Groq API Error, falling back to mock data:', aiError.message);
                // Fall through to mock data
            }
        }

        // 2. Mock Data Fallback (Premium Lindy Style)
        const mockResponses = {
            objective: { objective: `Strategy-driven ${jobRole} with a proven track record of excellence in ${experienceLevel}-level initiatives. Dedicated to engineering high-impact, scalable solutions while maintaining the most rigorous standards of technical elegance and architectural integrity to drive significant business value.` },
            skills: {
                languages: "JavaScript (Expert proficiency in ES6+ syntax and functional programming patterns), Python (Advanced automation and data processing scripts), Java (Robust enterprise-level back-end development)",
                frameworks: "React (Modern hooks, state management with Redux/Zustand, and performance optimization), Node.js (High-performance asynchronous server-side architecture and RESTful API design)",
                tools: "Git (Advanced version control and collaborative CI/CD workflows), Docker (Containerization for seamless cross-environment deployment), AWS (Scalable cloud infrastructure management)"
            },
            suggest_projects: {
                projects: [
                    {
                        title: "Strategic AI Implementation Framework",
                        technologies: "Python, TensorFlow, Kubernetes, AWS",
                        description: [
                            "Engineered a comprehensive AI-driven analytical framework that automated complex data processing tasks, resulting in a substantial reduction in manual labor hours and improving data accuracy across multiple departments.",
                            "Designed and deployed scalable cloud infrastructure to support the large-scale integration of machine learning models, ensuring high availability and seamless performance for global enterprise-level users.",
                            "Orchestrated the architectural redesign of the core data processing engine, achieving a 45% increase in system throughput and reducing overall operational costs by 20% through efficient resource allocation."
                        ]
                    }
                ]
            },
            suggest_experience: {
                experience: [
                    {
                        company: "Global Innovation Systems",
                        role: `Senior ${jobRole}`,
                        location: "New York, NY",
                        startDate: "2021",
                        endDate: "Present",
                        description: [
                            "Leading the strategic development of enterprise-grade applications, focusing on architectural scalability and performance optimization to enhance internal data-driven decision-making processes for Fortune 500 clients.",
                            "Successfully optimized large-scale data ingestion pipelines using distributed computing techniques, reducing data latency by 50% and enabling real-time analytical capabilities for global stakeholders.",
                            "Spearheaded cross-functional teams in the implementation of advanced security protocols, reducing system vulnerabilities by 65% while maintaining a seamless user experience for over 1 million active users."
                        ]
                    }
                ]
            },
            suggest_education: {
                education: [
                    {
                        institution: "Stanford University Graduate School",
                        degree: "Master of Science in Computer Science",
                        location: "Stanford, CA",
                        startDate: "2019",
                        endDate: "2021",
                        gpa: "4.0",
                        relevantCoursework: "Advanced Algorithmic Design, Distributed Systems, Artificial Intelligence Synthesis, Machine Learning Optimization"
                    }
                ]
            },
            suggest_leadership: {
                leadership: [
                    {
                        organization: "Association for Computing Machinery (ACM)",
                        role: "University Chapter President",
                        location: "Campus",
                        startDate: "2020",
                        endDate: "2021",
                        description: [
                            "Spearheaded a series of prestigious technical seminars and coding competitions, attracting over 500 participants and securing $10,000 in corporate sponsorship from top-tier technology firms.",
                            "Established a comprehensive mentorship program connecting undergraduate students with industry professionals, resulting in a 40% increase in high-profile internship placements for chapter members."
                        ]
                    }
                ]
            },
            rewrite_project: {
                description: [
                    "Successfully engineered a scalable, high-availability platform architecture using modern design patterns, which directly resulted in a 40% improvement in system performance and a 20% reduction in operational overhead.",
                    "Implemented advanced automated testing suites and CI/CD pipelines that reduced production deployment errors by 60% and ensured consistent delivery of high-quality, bug-free software features.",
                    "Optimized complex database queries and back-end logic to handle high-frequency data transactions, resulting in a seamless user experience and a 50% decrease in average server response times across all modules."
                ]
            },
            rewrite_experience: {
                description: [
                    "Pioneered the development of industry-leading professional solutions by leading multi-disciplinary teams through intense development cycles, delivering key product features ahead of schedule and under budget constraints.",
                    "Optimized complex operational workflows and back-end logic to handle high-frequency data transactions, resulting in a seamless stakeholder experience and a 50% increase in overall process efficiency.",
                    "Directed successful team-wide transitions to cloud-native technologies, resulting in a 30% increase in overall system reliability and a significant reduction in long-term infrastructure maintenance costs."
                ]
            }
        };

        const result = mockResponses[type] || { message: "Mock data not available" };
        return res.status(200).json({ result });

    } catch (error) {
        console.error('Final AI Controller Error:', error.message);
        res.status(500).json({ message: `AI Generation Error: ${error.message}` });
    }
};

module.exports = {
    generateContent,
};
