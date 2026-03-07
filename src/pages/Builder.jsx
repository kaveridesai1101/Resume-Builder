import React, { useState } from 'react';
import {
    User,
    GraduationCap,
    Briefcase,
    Code,
    Wrench,
    Award,
    Settings,
    Eye,
    Download,
    BarChart,
    Sparkles,
    LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import LeadershipForm from '../components/LeadershipForm';
import ConfigForm from '../components/ConfigForm';
import ResumePreview from '../components/ResumePreview';

const Builder = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const tabs = [
        { id: 'personal', label: 'Personal', icon: <User className="w-5 h-5" /> },
        { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'projects', label: 'Projects', icon: <Code className="w-5 h-5" /> },
        { id: 'skills', label: 'Skills', icon: <Wrench className="w-5 h-5" /> },
        { id: 'leadership', label: 'Leadership', icon: <Award className="w-5 h-5" /> },
        { id: 'config', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ];

    const renderForm = () => {
        switch (activeTab) {
            case 'personal': return <PersonalDetailsForm />;
            case 'education': return <EducationForm />;
            case 'experience': return <ExperienceForm />;
            case 'projects': return <ProjectsForm />;
            case 'skills': return <SkillsForm />;
            case 'leadership': return <LeadershipForm />;
            case 'config': return <ConfigForm />;
            default: return <PersonalDetailsForm />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between">
                <div>
                    <div className="p-4 border-b border-slate-100 flex items-center justify-center lg:justify-start">
                        <div className="bg-primary-500 p-2 rounded-lg text-white">
                            <User className="h-6 w-6" />
                        </div>
                        <span className="ml-3 font-bold text-lg hidden lg:block text-slate-800">Builder</span>
                    </div>
                    <nav className="p-4 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setShowPreviewMobile(false);
                                }}
                                className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === tab.id
                                    ? 'bg-primary-50 text-primary-600 font-medium'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                                title={tab.label}
                            >
                                {tab.icon}
                                <span className="ml-3 hidden lg:block">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-100 space-y-2">
                    <Link to="/dashboard" className="w-full flex items-center p-3 text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-colors">
                        <BarChart className="w-5 h-5" />
                        <span className="ml-3 hidden lg:block">ATS Score</span>
                    </Link>
                    <button
                        onClick={() => {
                            document.title = 'My_Resume';
                            window.print();
                        }}
                        className="w-full flex items-center p-3 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors font-medium border border-primary-100 mt-2"
                    >
                        <Download className="w-5 h-5" />
                        <span className="ml-3 hidden lg:block">Print PDF</span>
                    </button>

                    <div className="pt-4 mt-2 border-t border-slate-100">
                        <div className="flex items-center p-3 bg-slate-50 rounded-xl mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </div>
                            <div className="ml-3 hidden lg:block overflow-hidden text-ellipsis">
                                <p className="text-xs font-bold text-slate-700 truncate">{user.name || 'User'}</p>
                                <p className="text-[10px] text-slate-500 truncate">{user.email || 'Free Account'}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="ml-3 hidden lg:block">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col md:flex-row overflow-hidden relative ${showPreviewMobile ? 'hidden md:flex' : 'flex'}`}>

                {/* Form Workspace */}
                <section className={`flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 ${showPreviewMobile ? 'hidden md:block' : 'block'}`}>
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6 bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-start gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-purple-800">Pro-Tip: Fill your resume with AI</h4>
                                <p className="text-xs text-purple-600 mt-1 leading-relaxed">
                                    Want a professional resume fast? Use the <strong>"Suggest with AI"</strong> buttons in any section to instantly populate your resume with industry-grade content that looks professional, attractive, and dense, regardless of your background or field.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                            {renderForm()}
                        </div>
                    </div>
                </section>

                {/* Live Preview Pane */}
                <section className={`flex-1 bg-slate-200 p-4 md:p-8 overflow-y-auto hidden xl:block shadow-inner ${showPreviewMobile ? '!block absolute inset-0 z-50' : ''}`}>
                    <div className="max-w-[800px] mx-auto bg-white shadow-2xl min-h-[1056px] transition-all duration-300">
                        <ResumePreview />
                    </div>
                </section>

            </main>

            {/* Mobile Preview Toggle */}
            <button
                className="xl:hidden fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-2xl z-50 hover:bg-primary-700 transition-colors"
                onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            >
                {showPreviewMobile ? <User className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>

        </div>
    );
};

export default Builder;
