import React, { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, TrendingUp, LogOut } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { resumeData } = useResume();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };
    const { personal, experience, education, projects, skills } = resumeData;

    const [score, setScore] = React.useState(0);
    const [checks, setChecks] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAtsScore = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/ats/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        jobRole: resumeData?.config?.jobRole || 'Software Developer',
                        resumeData: resumeData
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setScore(data.overallScore || 0);

                    const rules = [];

                    if (data.matchedCount > 0) {
                        rules.push({
                            label: `Matched ${data.matchedCount} Industry Keywords`,
                            status: 'pass',
                            suggestion: `Excellent use of relevant terms: ${data.skillsMatch.slice(0, 5).join(', ')}.`
                        });
                    }

                    if (data.missingKeywords && data.missingKeywords.length > 0) {
                        rules.push({
                            label: `Missing ${data.missingKeywords.length} Targeted Keywords`,
                            status: data.missingKeywords.length > 5 ? 'fail' : 'warn',
                            suggestion: `Try incorporating: ${data.missingKeywords.slice(0, 5).join(', ')}.`
                        });
                    } else if (data.missingKeywords && data.missingKeywords.length === 0) {
                        rules.push({
                            label: `Perfect Keyword Match`,
                            status: 'pass',
                            suggestion: `Your resume contains all standard targeted keywords for your role!`
                        });
                    }

                    if (data.breakdown.structure >= 30) {
                        rules.push({
                            label: 'Complete Document Structure',
                            status: 'pass',
                            suggestion: 'Your layout includes all critical sections (Experience, Skills, Education).'
                        });
                    } else {
                        rules.push({
                            label: 'Incomplete Sections',
                            status: 'warn',
                            suggestion: 'Ensure you have fully populated your Experience, Skills, and Education sections to score higher.'
                        });
                    }

                    setChecks(rules);
                } else {
                    // Fallback visually if API fails
                    setScore(70);
                    setChecks([{ label: 'Basic ATS Check', status: 'warn', suggestion: 'Score estimated. Backend unavailable.' }]);
                }
            } catch (err) {
                console.error('Failed to get ATS score', err);
                setScore(50);
                setChecks([{ label: 'Connection Error', status: 'fail', suggestion: 'Could not connect to ATS analyzer.' }]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAtsScore();
    }, [resumeData]);

    const getScoreColor = () => {
        if (score >= 80) return 'text-emerald-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const StatusIcon = ({ status }) => {
        if (status === 'pass') return <CheckCircle className="w-5 h-5 text-emerald-500" />;
        if (status === 'warn') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
        return <XCircle className="w-5 h-5 text-red-500" />;
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-10 selection:bg-primary-500 selection:text-white">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <Link to="/builder" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary-600 transition-all mb-3 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Builder
                        </Link>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">ATS Analysis</h1>
                        <p className="text-slate-500 mt-2 font-medium">Real-time optimization feedback using industry-standard screening logic.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link to="/download" className="flex-1 md:flex-none px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 text-center text-sm">
                            Finalize & Download
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="p-3.5 text-red-500 bg-white border border-red-100 rounded-2xl hover:bg-red-50 transition-all shadow-sm"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Score Card */}
                    <div className="lg:col-span-4 bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-between">
                        <div className="w-full text-left mb-8">
                            <h2 className="text-lg font-bold text-slate-800 tracking-tight uppercase text-xs">Resume Score</h2>
                        </div>

                        <div className="relative w-56 h-56 flex items-center justify-center">
                            {/* SVG Circle Graph */}
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-50" />
                                <circle
                                    cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent"
                                    strokeDasharray="628"
                                    strokeDashoffset={628 - (628 * score) / 100}
                                    strokeLinecap="round"
                                    className={`${getScoreColor()} transition-all duration-1000 ease-out`}
                                />
                            </svg>
                            <div className="text-center z-10">
                                <span className={`text-6xl font-black tracking-tighter ${getScoreColor()}`}>{score}</span>
                                <span className="text-slate-300 text-xl font-bold ml-1">/100</span>
                            </div>
                        </div>

                        <div className="mt-12 text-center bg-slate-50 p-5 rounded-2xl w-full border border-slate-100">
                            <p className="text-sm font-bold text-slate-700 leading-relaxed">
                                {score >= 80 ? 'Perfect! Your resume is highly competitive.' : score >= 60 ? 'Good progress. Apply the tips to hit 80+.' : 'Needs significant optimizations to pass ATS.'}
                            </p>
                        </div>
                    </div>

                    {/* Analysis Checklist */}
                    <div className="lg:col-span-8 bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                                <TrendingUp className="w-6 h-6 text-primary-500 mr-3" />
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Optimization Checklist</h2>
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{checks.length} Analysis Points</span>
                        </div>

                        <div className="space-y-4">
                            {checks.map((check, i) => (
                                <div key={i} className={`flex items-start p-6 rounded-2xl border transition-all ${check.status === 'pass' ? 'bg-emerald-50/30 border-emerald-100/50 hover:bg-emerald-50/50' :
                                    check.status === 'warn' ? 'bg-yellow-50/30 border-yellow-100/50 hover:bg-yellow-50/50' :
                                        'bg-red-50/30 border-red-100/50 hover:bg-red-50/50'
                                    }`}>
                                    <div className="mt-1 transform scale-110"><StatusIcon status={check.status} /></div>
                                    <div className="ml-5 flex-1">
                                        <h4 className={`font-bold text-base ${check.status === 'pass' ? 'text-emerald-900' :
                                            check.status === 'warn' ? 'text-yellow-900' :
                                                'text-red-900'
                                            }`}>
                                            {check.label}
                                        </h4>
                                        {check.status !== 'pass' && (
                                            <p className={`text-sm mt-1.5 font-medium leading-relaxed ${check.status === 'warn' ? 'text-yellow-700/80' : 'text-red-700/80'
                                                }`}>
                                                {check.suggestion}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
