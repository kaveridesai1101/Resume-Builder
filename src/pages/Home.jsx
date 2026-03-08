import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, CheckCircle, Download, ArrowRight, MousePointer2, Zap, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-500 selection:text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-primary-500 p-1.5 rounded-lg shadow-lg shadow-primary-500/20">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">AI Resume <span className="text-primary-600">Builder</span></span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors">How it Works</a>
                        <Link to="/builder" className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors">Builder</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Log In</Link>
                        <Link to="/register" className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold shadow-xl shadow-slate-900/10 transition-all transform hover:-translate-y-0.5">Sign Up Free</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-40 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-8 shadow-sm">
                                <Sparkles className="h-4 w-4 text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Next-Gen Resume Intelligence</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-slate-900">
                                Land your dream job <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">with AI Precision.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Build recruiter-approved resumes that bypass ATS filters automatically. Professional, dense, and strictly beautiful. Join the smart workforce today.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link to="/builder" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-2xl shadow-primary-600/30 transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center group">
                                    Start Building Free
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="flex items-center space-x-3 px-2 py-4">
                                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                    <span className="text-sm font-bold text-slate-600 whitespace-nowrap">No Credit Card Required</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative w-full max-w-2xl mx-auto lg:max-w-none">
                            <div className="relative rounded-[40px] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.15)] border border-slate-100 transform lg:rotate-3 hover:rotate-0 transition-all duration-700">
                                <img
                                    src="/assets/hero-resume.png"
                                    alt="Professional Resume Mockup"
                                    className="w-full h-auto"
                                />
                            </div>
                            {/* Decorative Elements around image */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full blur-[80px] opacity-60"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-100 rounded-full blur-[80px] opacity-60"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trusted By Section */}
            <section className="py-12 border-y border-slate-100 bg-slate-50/30">
                <div className="container mx-auto px-6">
                    <p className="text-center text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-8">Trusted by talent at</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-2xl font-black tracking-tighter text-slate-600">Google</span>
                        <span className="text-2xl font-black tracking-tighter text-slate-600">Meta</span>
                        <span className="text-2xl font-black tracking-tighter text-slate-600">Amazon</span>
                        <span className="text-2xl font-black tracking-tighter text-slate-600">Netflix</span>
                        <span className="text-2xl font-black tracking-tighter text-slate-600">Microsoft</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Engineered for Success</h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">Everything you need to build a high-conversion resume that gets you through the screening and into the interview room.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative cursor-default">
                        <FeatureCard
                            icon={<CheckCircle className="h-8 w-8 text-primary-600" />}
                            title="ATS Optimization"
                            description="Our builder ensures your resume is structured perfectly for algorithms, using industry-standard templates and fonts."
                        />
                        <FeatureCard
                            icon={<Sparkles className="h-8 w-8 text-cyan-500" />}
                            title="AI Rewriting"
                            description="Struggling with descriptions? Our AI suggests professional, 2-line bullet points that make your experience sound prestigious."
                        />
                        <FeatureCard
                            icon={<Download className="h-8 w-8 text-indigo-500" />}
                            title="Instant Export"
                            description="Download your document in a single click. perfectly formatted PDF every time, guaranteed to look great on any screen."
                        />
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 font-display">How it Works</h2>
                        <p className="text-lg text-slate-500 font-medium">Simple 3-step process to a perfect resume.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <StepCard
                            number="01"
                            icon={<MousePointer2 className="h-6 w-6 text-primary-600" />}
                            title="Input Details"
                            description="Fill in your basic information, education, and experience through our intuitive, structured builder."
                        />
                        <StepCard
                            number="02"
                            icon={<Zap className="h-6 w-6 text-cyan-500" />}
                            title="Apply AI Magic"
                            description="Let our AI rewrite your points and suggest high-impact projects that align with your professional goals."
                        />
                        <StepCard
                            number="03"
                            icon={<Download className="h-6 w-6 text-indigo-500" />}
                            title="Export Results"
                            description="Preview your resume with our real-time board and download the final version as a professional PDF."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-slate-900 rounded-[48px] p-16 md:p-24 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                Ready to build your <br /> career future?
                            </h2>
                            <Link to="/register" className="inline-flex items-center px-12 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-primary-500/40 transition-all transform hover:-translate-y-1">
                                Join Now for Free
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </Link>
                        </div>
                        {/* Background Design */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-500 rounded-full blur-[120px]"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[120px]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <div className="bg-primary-500 p-1.5 rounded-lg">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">AI Resume Builder</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">© 2026 AI Resume Builder. All rights reserved. Strictly Professional.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white border border-slate-100 p-10 rounded-[32px] hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 transform hover:-translate-y-2 group">
        <div className="mb-8 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-50 transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-xl font-extrabold mb-4 text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-bold">
            {description}
        </p>
    </div>
);

const StepCard = ({ number, icon, title, description }) => (
    <div className="relative p-10 bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
        <span className="absolute top-8 right-8 text-5xl font-black text-slate-50 group-hover:text-primary-50 transition-colors duration-500">{number}</span>
        <div className="mb-8 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-50 group-hover:scale-110 transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
);

export default Home;
