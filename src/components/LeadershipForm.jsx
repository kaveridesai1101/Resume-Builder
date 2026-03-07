import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import AISuggestionList from './AISuggestionList';
import { generateAIContent } from '../services/aiService';

const LeadershipForm = () => {
    const { resumeData, updateArrayItem, addArrayItem, removeArrayItem } = useResume();
    const [loading, setLoading] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const leadership = resumeData.leadership;

    const handleAdd = () => {
        addArrayItem('leadership', {
            organization: '',
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
            // Collect existing leadership roles or organizations
            const existingContext = (resumeData.leadership || [])
                .map(item => `${item.role} at ${item.organization}`)
                .filter(str => str !== ' at ')
                .join(', ');

            const result = await generateAIContent({
                type: 'suggest_leadership',
                jobRole: resumeData.config.jobRole || 'Software Developer',
                experienceLevel: resumeData.config.experienceLevel || 'Fresher',
                tone: resumeData.config.resumeTone || 'Professional',
                data: existingContext || ''
            });

            if (result && result.leadership) {
                setSuggestions(result.leadership);
            }
        } catch (error) {
            alert('Failed to get AI suggestions. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        addArrayItem('leadership', suggestion);
        setSuggestions(prev => prev.filter(s => s.organization !== suggestion.organization));
    };

    const handleDescChange = (itemId, descIndex, value) => {
        const item = leadership.find(i => i.id === itemId);
        const newDesc = [...item.description];
        newDesc[descIndex] = value;
        updateArrayItem('leadership', itemId, 'description', newDesc);
    };

    const addDescPoint = (itemId) => {
        const item = leadership.find(i => i.id === itemId);
        updateArrayItem('leadership', itemId, 'description', [...item.description, '']);
    };

    const removeDescPoint = (itemId, descIndex) => {
        const item = leadership.find(i => i.id === itemId);
        const newDesc = item.description.filter((_, idx) => idx !== descIndex);
        updateArrayItem('leadership', itemId, 'description', newDesc.length ? newDesc : ['']);
    };

    return (
        <div className="animate-fade-in-up md:animate-none space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Leadership & Extracurricular</h2>
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
                        <Plus className="w-4 h-4 mr-1" /> Add Entry
                    </button>
                </div>
            </div>

            <AISuggestionList
                suggestions={suggestions}
                onSelect={handleSelectSuggestion}
                loading={loading && suggestions.length === 0}
                onRefresh={handleAISuggest}
                type="leadership"
            />

            {leadership.map((item, index) => (
                <div key={item.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 relative group">
                    <div className="absolute -left-3 -top-3 w-6 h-6 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                        {index + 1}
                    </div>

                    <button
                        onClick={() => removeArrayItem('leadership', item.id)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Entry"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Organization / Club</label>
                            <input
                                type="text"
                                value={item.organization}
                                onChange={(e) => updateArrayItem('leadership', item.id, 'organization', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Computer Science Club"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Position</label>
                            <input
                                type="text"
                                value={item.role}
                                onChange={(e) => updateArrayItem('leadership', item.id, 'role', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="President"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <input
                                type="text"
                                value={item.location}
                                onChange={(e) => updateArrayItem('leadership', item.id, 'location', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="University Campus"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                                <input
                                    type="text"
                                    value={item.startDate}
                                    onChange={(e) => updateArrayItem('leadership', item.id, 'startDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="Sep 2020"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                                <input
                                    type="text"
                                    value={item.endDate}
                                    onChange={(e) => updateArrayItem('leadership', item.id, 'endDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="May 2022"
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
                                            placeholder="Describe your responsibilities..."
                                        />
                                        <button
                                            onClick={() => removeDescPoint(item.id, dIndex)}
                                            className="text-slate-400 hover:text-red-500 p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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

export default LeadershipForm;
