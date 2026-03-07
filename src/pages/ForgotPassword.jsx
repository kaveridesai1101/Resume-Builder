import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
            } else {
                setError(data.message || 'Request failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-50 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10 text-slate-900 flex flex-col items-center">
                    <div className="bg-primary-500 p-2 rounded-xl shadow-lg shadow-primary-500/20 mb-4">
                        <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">Reset Password</h1>
                    <p className="text-slate-500 mt-2 font-medium">Enter your email and we'll send you a reset code</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-[32px] p-10 shadow-2xl shadow-slate-200/50">
                    {submitted ? (
                        <div className="text-center py-6">
                            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-10 w-10 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Check Your Email</h3>
                            <p className="text-slate-500 font-medium mb-8">We've sent a password reset OTP to <b>{email}</b></p>
                            <Link
                                to="/reset-password"
                                state={{ email }}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg inline-flex items-center justify-center space-x-2"
                            >
                                <span>Enter Code</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 animate-shake">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm font-bold">{error}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-3">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/10 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Send Reset Code</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center flex flex-col space-y-4">
                    <Link to="/login" className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors uppercase tracking-widest">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
