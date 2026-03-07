import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Sparkles, Plus, Loader2 } from 'lucide-react';
import AISuggestionList from './AISuggestionList';
import { generateAIContent } from '../services/aiService';

const SkillsForm = () => {
    const { resumeData, updateField, setResumeData } = useResume();
    const [loading, setLoading] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState(null);
    const skills = resumeData.skills;

    const handleChange = (e) => {
        updateField('skills', e.target.name, e.target.value);
    };

    const handleAISuggest = async () => {
        setLoading(true);
        setSuggestions(null);
        try {
            const result = await generateAIContent({
                type: 'skills',
                jobRole: resumeData.config.jobRole || 'Software Developer',
                experienceLevel: resumeData.config.experienceLevel || 'Fresher',
                tone: resumeData.config.resumeTone || 'Professional'
            });

            if (result) {
                // Convert to array format for AISuggestionList logic if needed, 
                // but let's just use a custom simple display for skills
                setSuggestions(result);
            }
        } catch (error) {
            alert('Failed to get AI suggestions. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkill = (category, value) => {
        const current = skills[category] || '';
        const newValue = current ? `${current}, ${value}` : value;
        updateField('skills', category, newValue);
    };

    return (
        <div className="animate-fade-in-up md:animate-none space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Technical Skills</h2>
                <button
                    onClick={handleAISuggest}
                    disabled={loading}
                    className="flex items-center text-sm bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4 mr-1" />
                    )}
                    Suggest with AI
                </button>
            </div>

            {loading && !suggestions && (
                <div className="flex flex-col items-center justify-center p-8 bg-purple-50 rounded-xl border border-purple-100 animate-pulse">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-3" />
                    <p className="text-purple-600 font-medium">Analyzing industry trends...</p>
                </div>
            )}

            {suggestions && (
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl space-y-4 animate-fade-in">
                    <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" /> Smart Suggestions
                    </h4>
                    <div className="space-y-3">
                        {['languages', 'frameworks', 'tools'].map(cat => (
                            suggestions[cat] && (
                                <div key={cat}>
                                    <p className="text-[10px] text-purple-600 font-bold uppercase mb-1">{cat}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestions[cat].split(',').map((s, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAddSkill(cat, s.trim())}
                                                className="text-xs bg-white border border-purple-200 px-2 py-1 rounded-md hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1 shadow-sm"
                                            >
                                                <Plus className="w-3 h-3" /> {s.trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Languages</label>
                <textarea
                    name="languages"
                    value={skills.languages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow h-20 resize-none"
                    placeholder="JavaScript, Python, C++"
                />
                <p className="text-xs text-slate-500 mt-1">Separate skills with commas</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Frameworks & Libraries</label>
                <textarea
                    name="frameworks"
                    value={skills.frameworks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow h-20 resize-none"
                    placeholder="React, Node.js, Express, Tailwind CSS"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tools & Platforms</label>
                <textarea
                    name="tools"
                    value={skills.tools}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow h-20 resize-none"
                    placeholder="Git, Docker, AWS, Webpack"
                />
            </div>
        </div>
    );
};

export default SkillsForm;
