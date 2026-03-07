import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
    return useContext(ResumeContext);
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        personal: {
            fullName: 'First Last',
            email: 'email@gmail.com',
            phone: '123-456-7890',
            address: '123 Street Name, Town, State 12345',
            linkedin: 'linkedin.com/in/username',
            github: 'github.com/username',
        },
        education: [
            {
                id: '1',
                institution: 'University of Technology',
                degree: 'Bachelor of Science in Computer Science',
                location: 'City, State',
                startDate: 'Aug 2018',
                endDate: 'May 2022',
                gpa: '3.8',
                relevantCoursework: 'Data Structures, Algorithms, Database Systems',
            }
        ],
        experience: [
            {
                id: '1',
                company: 'Tech Solutions Inc.',
                role: 'Software Engineer',
                location: 'San Francisco, CA',
                startDate: 'Jun 2022',
                endDate: 'Present',
                description: [
                    'Developed and maintained scalable web applications using React and Node.js.',
                    'Collaborated with cross-functional teams to define, design, and ship new features.',
                    'Improved application performance by 20% through code optimization.',
                ],
            }
        ],
        projects: [
            {
                id: '1',
                title: 'E-commerce Platform',
                technologies: 'React, Express, MongoDB',
                date: 'Jan 2022 - Apr 2022',
                description: [
                    'Built a full-stack e-commerce web application.',
                    'Implemented secure user authentication and payment gateway integration.',
                ],
            }
        ],
        skills: {
            languages: 'JavaScript, TypeScript, Python, Java',
            frameworks: 'React, Node.js, Express, Tailwind CSS',
            tools: 'Git, Docker, AWS, Webpack',
        },
        leadership: [
            {
                id: '1',
                organization: 'Computer Science Club',
                role: 'President',
                location: 'University Campus',
                startDate: 'Sep 2020',
                endDate: 'May 2022',
                description: [
                    'Organized weekly coding workshops for 50+ members.',
                    'Hosted annual hackathon with over 200 participants.',
                ],
            }
        ],
        config: {
            jobRole: 'Software Developer',
            experienceLevel: 'Fresher',
            resumeTone: 'Professional',
        }
    });

    const updateField = (section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateArrayItem = (section, id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (section, newItem) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now().toString(), ...newItem }]
        }));
    };

    const removeArrayItem = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const bulkAddArrayItems = (section, newItems) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [
                ...prev[section],
                ...newItems.map(item => ({ id: Math.random().toString(36).substr(2, 9), ...item }))
            ]
        }));
    };

    const updateConfig = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            config: {
                ...prev.config,
                [field]: value
            }
        }));
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            updateField,
            updateArrayItem,
            addArrayItem,
            removeArrayItem,
            bulkAddArrayItems,
            updateConfig
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
