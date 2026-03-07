import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import AISuggestionList from './AISuggestionList';
import { generateAIContent } from '../services/aiService';

const ExperienceForm = () => {
    const { resumeData, updateArrayItem, addArrayItem, removeArrayItem, bulkAddArrayItems } = useResume();
    const [loading, setLoading] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const experience = resumeData.experience;

    const handleAdd = () => {
        addArrayItem('experience', {
            company: '',
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ['']
        });
    };

    const handleAISuggest = async () => {
        setLoading(true);
        setSuggestions([]);
        try {
            // Collect existing roles and company names to provide context
            const existingContext = experience
                .map(item => `${item.role} at ${item.company}`)
                .filter(str => str !== ' at ')
                .join(', ');

            const result = await generateAIContent({
                type: 'suggest_experience',
                jobRole: resumeData.config.jobRole || 'Software Developer',
                experienceLevel: resumeData.config.experienceLevel || 'Fresher',
                tone: resumeData.config.resumeTone || 'Professional',
                data: existingContext || '' // Pass existing context for smarter suggestions
            });

            if (result && result.experience) {
                setSuggestions(result.experience);
            }
        } catch (error) {
            alert('Failed to get AI suggestions. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        addArrayItem('experience', suggestion);
        setSuggestions(prev => prev.filter(s => s.role !== suggestion.role));
    };

    const handleDescChange = (itemId, descIndex, value) => {
        const item = experience.find(i => i.id === itemId);
        const newDesc = [...item.description];
        newDesc[descIndex] = value;
        updateArrayItem('experience', itemId, 'description', newDesc);
    };

    const addDescPoint = (itemId) => {
        const item = experience.find(i => i.id === itemId);
        updateArrayItem('experience', itemId, 'description', [...item.description, '']);
    };

    const removeDescPoint = (itemId, descIndex) => {
        const item = experience.find(i => i.id === itemId);
        const newDesc = item.description.filter((_, idx) => idx !== descIndex);
        updateArrayItem('experience', itemId, 'description', newDesc.length ? newDesc : ['']);
    };

    const handleRewriting = async (itemId, descIndex) => {
        const item = experience.find(i => i.id === itemId);
        const originalText = item.description[descIndex];
        if (!originalText) return;

        setLoading(true);
        try {
            const result = await generateAIContent({
                type: 'rewrite_experience',
                jobRole: resumeData.config.jobRole || 'Software Developer',
                experienceLevel: resumeData.config.experienceLevel || 'Fresher',
                tone: resumeData.config.resumeTone || 'Professional',
                data: originalText
            });

            if (result && result.description) {
                const item = experience.find(i => i.id === itemId);
                const newDesc = [...item.description];
                // Replace the current index with all suggested high-impact points
                newDesc.splice(descIndex, 1, ...result.description);
                updateArrayItem('experience', itemId, 'description', newDesc);
            }
        } catch (error) {
            console.error('Rewrite failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up md:animate-none space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Work Experience</h2>
                <div className="flex gap-2">
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
                    <button
                        onClick={handleAdd}
                        className="flex items-center text-sm bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Experience
                    </button>
                </div>
            </div>

            <AISuggestionList
                suggestions={suggestions}
                onSelect={handleSelectSuggestion}
                loading={loading && suggestions.length === 0}
                onRefresh={handleAISuggest}
                type="experience"
            />

            {experience.map((item, index) => (
                <div key={item.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 relative group">
                    <div className="absolute -left-3 -top-3 w-6 h-6 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                        {index + 1}
                    </div>

                    <button
                        onClick={() => removeArrayItem('experience', item.id)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Entry"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                value={item.company}
                                onChange={(e) => updateArrayItem('experience', item.id, 'company', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Tech Solutions Inc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Job Role / Title</label>
                            <input
                                type="text"
                                value={item.role}
                                onChange={(e) => updateArrayItem('experience', item.id, 'role', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Software Engineer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <input
                                type="text"
                                value={item.location}
                                onChange={(e) => updateArrayItem('experience', item.id, 'location', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="San Francisco, CA"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                                <input
                                    type="text"
                                    value={item.startDate}
                                    onChange={(e) => updateArrayItem('experience', item.id, 'startDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="Jun 2022"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                                <input
                                    type="text"
                                    value={item.endDate}
                                    onChange={(e) => updateArrayItem('experience', item.id, 'endDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="Present"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description Points</label>
                            <div className="space-y-3">
                                {item.description.map((desc, dIndex) => (
                                    <div key={dIndex} className="flex gap-2">
                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                                        <textarea
                                            value={desc}
                                            onChange={(e) => handleDescChange(item.id, dIndex, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none h-10 resize-none overflow-hidden"
                                            placeholder="Describe your achievement..."
                                        />
                                        <div className="flex flex-col gap-1">
                                            <button
                                                onClick={() => handleRewriting(item.id, dIndex)}
                                                disabled={loading || !desc}
                                                className="text-purple-400 hover:text-purple-600 p-1 disabled:opacity-30"
                                                title="Rewrite with AI"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeDescPoint(item.id, dIndex)}
                                                className="text-slate-400 hover:text-red-500 p-1"
                                                title="Remove Point"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => addDescPoint(item.id)}
                                className="mt-3 text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-1" /> Add Bullet Point
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExperienceForm;
