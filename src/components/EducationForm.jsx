import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import AISuggestionList from './AISuggestionList';
import { generateAIContent } from '../services/aiService';

const EducationForm = () => {
    const { resumeData, updateArrayItem, addArrayItem, removeArrayItem } = useResume();
    const [loading, setLoading] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const education = resumeData.education;

    const handleAdd = () => {
        addArrayItem('education', {
            institution: '',
            degree: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: '',
            relevantCoursework: ''
        });
    };

    const handleAISuggest = async () => {
        setLoading(true);
        setSuggestions([]);
        try {
            const result = await generateAIContent({
                type: 'suggest_education',
                jobRole: resumeData.config.jobRole || 'Software Developer',
                experienceLevel: resumeData.config.experienceLevel || 'Fresher',
                tone: resumeData.config.resumeTone || 'Professional'
            });

            if (result && result.education) {
                setSuggestions(result.education);
            }
        } catch (error) {
            alert('Failed to get AI suggestions. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        addArrayItem('education', suggestion);
        setSuggestions(prev => prev.filter(s => s.institution !== suggestion.institution));
    };

    return (
        <div className="animate-fade-in-up md:animate-none space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Education Background</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleAISuggest}
                        disabled={loading}
                        className="flex items-center text-sm bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                    >
                        {loading && suggestions.length === 0 ? (
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
                        <Plus className="w-4 h-4 mr-1" /> Add Education
                    </button>
                </div>
            </div>

            <AISuggestionList
                suggestions={suggestions}
                onSelect={handleSelectSuggestion}
                loading={loading && suggestions.length === 0}
                onRefresh={handleAISuggest}
                type="education"
            />

            {education.map((item, index) => (
                <div key={item.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 relative group">
                    <div className="absolute -left-3 -top-3 w-6 h-6 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                        {index + 1}
                    </div>

                    <button
                        onClick={() => removeArrayItem('education', item.id)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Entry"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Institution Name</label>
                            <input
                                type="text"
                                value={item.institution}
                                onChange={(e) => updateArrayItem('education', item.id, 'institution', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="University of Technology"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Degree & Major</label>
                            <input
                                type="text"
                                value={item.degree}
                                onChange={(e) => updateArrayItem('education', item.id, 'degree', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Bachelor of Science in Computer Science"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <input
                                type="text"
                                value={item.location}
                                onChange={(e) => updateArrayItem('education', item.id, 'location', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="City, State"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">GPA (Optional)</label>
                            <input
                                type="text"
                                value={item.gpa}
                                onChange={(e) => updateArrayItem('education', item.id, 'gpa', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="3.8 / 4.0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input
                                type="text"
                                value={item.startDate}
                                onChange={(e) => updateArrayItem('education', item.id, 'startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Aug 2018"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                            <input
                                type="text"
                                value={item.endDate}
                                onChange={(e) => updateArrayItem('education', item.id, 'endDate', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="May 2022 (or 'Present')"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Relevant Coursework</label>
                            <textarea
                                value={item.relevantCoursework}
                                onChange={(e) => updateArrayItem('education', item.id, 'relevantCoursework', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none h-20 resize-none"
                                placeholder="Data Structures, Algorithms, etc."
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EducationForm;
