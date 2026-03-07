import React from 'react';
import { Sparkles, Plus, Loader2 } from 'lucide-react';

const AISuggestionList = ({ suggestions, onSelect, loading, onRefresh, type }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-purple-50 rounded-xl border border-purple-100 animate-pulse">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-3" />
                <p className="text-purple-600 font-medium">AI is thinking...</p>
            </div>
        );
    }

    if (!suggestions || suggestions.length === 0) return null;

    return (
        <div className="mt-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-sm font-bold text-purple-700 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" /> AI Recommendations
                </span>
                <button
                    onClick={onRefresh}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                >
                    Get New Suggestions
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {suggestions.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white border border-purple-100 rounded-xl hover:shadow-md transition-all group relative border-l-4 border-l-purple-400"
                    >
                        <div className="pr-12">
                            {type === 'projects' && (
                                <>
                                    <h5 className="font-bold text-slate-800">{item.title}</h5>
                                    <p className="text-xs text-purple-600 font-medium mb-2">{item.technologies}</p>
                                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                                        {item.description.map((d, i) => <li key={i}>{d}</li>)}
                                    </ul>
                                </>
                            )}
                            {type === 'experience' && (
                                <>
                                    <h5 className="font-bold text-slate-800">{item.role}</h5>
                                    <p className="text-xs text-purple-600 font-medium mb-1">{item.company}</p>
                                    <p className="text-[10px] text-slate-400 mb-2">{item.startDate} - {item.endDate}</p>
                                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                                        {item.description.map((d, i) => <li key={i}>{d}</li>)}
                                    </ul>
                                </>
                            )}
                            {type === 'education' && (
                                <>
                                    <h5 className="font-bold text-slate-800">{item.degree}</h5>
                                    <p className="text-xs text-purple-600 font-medium">{item.institution}</p>
                                    <p className="text-[10px] text-slate-400">{item.startDate} - {item.endDate} | GPA: {item.gpa}</p>
                                    <p className="text-xs text-slate-500 mt-1 italic">{item.relevantCoursework}</p>
                                </>
                            )}
                            {type === 'leadership' && (
                                <>
                                    <h5 className="font-bold text-slate-800">{item.role}</h5>
                                    <p className="text-xs text-purple-600 font-medium mb-1">{item.organization}</p>
                                    <p className="text-[10px] text-slate-400 mb-2">{item.startDate} - {item.endDate}</p>
                                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                                        {item.description.map((d, i) => <li key={i}>{d}</li>)}
                                    </ul>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => onSelect(item)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs px-3"
                        >
                            <Plus className="w-4 h-4" /> Add
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AISuggestionList;
