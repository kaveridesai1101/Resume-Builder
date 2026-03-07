import React from 'react';
import { useResume } from '../context/ResumeContext';

const ConfigForm = () => {
    const { resumeData, updateConfig } = useResume();
    const config = resumeData.config;

    const handleChange = (e) => {
        updateConfig(e.target.name, e.target.value);
    };

    return (
        <div className="animate-fade-in-up md:animate-none space-y-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Resume Settings</h2>
                <p className="text-slate-500 text-sm mt-1">Configure your target job details to help the AI tailor your resume content.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Job Role</label>
                    <input
                        type="text"
                        name="jobRole"
                        value={config.jobRole}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="e.g. Frontend Developer, Data Scientist"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={config.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white transition-shadow"
                    >
                        <option value="Fresher">Entry Level / Fresher (0-2 years)</option>
                        <option value="Mid">Mid Level (3-5 years)</option>
                        <option value="Senior">Senior Level (5+ years)</option>
                        <option value="Executive">Executive / Director</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Resume Tone</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['Professional', 'Technical', 'Modern', 'Creative'].map((tone) => (
                            <label
                                key={tone}
                                className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${config.resumeTone === tone
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="resumeTone"
                                    value={tone}
                                    checked={config.resumeTone === tone}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <span className="font-medium">{tone}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigForm;
