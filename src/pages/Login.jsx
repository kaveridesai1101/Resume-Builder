import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/builder');
        }
    }, [navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
                navigate('/builder');
            } else {
                if (data.message === 'Please verify your email to log in') {
                    navigate('/verify-email', { state: { email: email } });
                }
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-primary-500 selection:text-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-50 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="w-full max-w-md relative z-10 transition-all">
                <div className="text-center mb-10">
                    <div className="bg-primary-500 p-2 rounded-xl shadow-lg shadow-primary-500/20 mb-4 inline-block">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 mt-2 font-medium">Log in to manage your professional presence</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-[32px] p-10 shadow-2xl shadow-slate-200/50">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 animate-shake">
                                <Mail className="h-5 w-5 flex-shrink-0" />
                                <p className="text-sm font-bold">{error}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-3">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-bold"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Password</label>
                                    <Link to="/forgot-password" size="sm" className="text-sm font-bold text-primary-600 hover:underline transition-colors">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-bold"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
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
                                    <span>Sign In</span>
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-slate-600 font-bold">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-600 hover:underline transition-all">
                        Sign up free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
