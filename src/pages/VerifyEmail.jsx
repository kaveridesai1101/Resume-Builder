import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    useEffect(() => {
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
                setTimeout(() => navigate('/builder'), 2000);
            } else {
                setError(data.message || 'Verification failed');
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
                    <h1 className="text-3xl font-black tracking-tighter">Verify Your Email</h1>
                    <p className="text-slate-500 mt-2 font-medium">We've sent a 6-digit code to <span className="text-slate-900 font-bold">{email}</span></p>
                </div>

                <div className="bg-white border border-slate-100 rounded-[32px] p-10 shadow-2xl shadow-slate-200/50">
                    {success ? (
                        <div className="text-center py-6">
                            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-10 w-10 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Verified!</h3>
                            <p className="text-slate-500 font-medium">Redirecting you to your dashboard...</p>
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
                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-3">Verification Code</label>
                                <input
                                    type="text"
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    placeholder="Enter 6-digit code"
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 text-center text-3xl font-black tracking-[0.5em] transition-all outline-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/10 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Verify Account</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-slate-400 text-sm font-bold">
                                Didn't receive the code?{' '}
                                <button type="button" className="text-primary-600 hover:underline">Resend OTP</button>
                            </p>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link to="/register" className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors uppercase tracking-widest">
                        ← Back to Registration
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
