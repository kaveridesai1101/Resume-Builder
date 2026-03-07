import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Builder from './pages/Builder';
import Dashboard from './pages/Dashboard';
import DownloadPage from './pages/DownloadPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <Builder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/download"
                element={
                  <ProtectedRoute>
                    <DownloadPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
