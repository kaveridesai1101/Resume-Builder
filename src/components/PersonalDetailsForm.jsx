import React from 'react';
import { useResume } from '../context/ResumeContext';

const PersonalDetailsForm = () => {
    const { resumeData, updateField } = useResume();
    const data = resumeData.personal;

    const handleChange = (e) => {
        updateField('personal', e.target.name, e.target.value);
    };

    return (
        <div className="animate-fade-in-up md:animate-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={data.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="e.g. John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="+1 234 567 890"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location / Address</label>
                    <input
                        type="text"
                        name="address"
                        value={data.address || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="e.g. 123 Street Name, Town, State 12345"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn URL</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={data.linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">GitHub URL</label>
                    <input
                        type="text"
                        name="github"
                        value={data.github}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                        placeholder="github.com/johndoe"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
