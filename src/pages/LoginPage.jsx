import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import logoImage from '../assets/PortfoliomateLogo.svg';

// --- Reusable Input Component ---
const AuthInput = ({ id, type, placeholder, icon, value, onChange, disabled }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-md text-sm focus:ring-[#312E81] focus:border-[#312E81] disabled:bg-gray-50"
    />
  </div>
);

// --- Icon Components ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;


function LoginPage() {
  const [authMethod, setAuthMethod] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  // States for handling login flow
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) {
      console.log(`Sending OTP to ${email}`);
      setOtpSent(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // --- OTP Login (Dummy) ---
    if (authMethod === 'otp') {
        if (otp === '123456') {
            console.log('OTP Login successful');
            navigate('/'); // Navigate to dashboard on success
        } else {
            setError('Invalid OTP. Please use 123456 for this demo.');
        }
        return;
    }

    // --- Password Login (Connected to Auth Context) ---
    if (authMethod === 'password') {
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/stakeholders'); // Navigate to dashboard on success
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center text-2xl font-bold text-gray-800">
               <img src={logoImage} alt="Portfoliomate Logo" className="h-8 w-8 mr-2" />
               <span>Portfoliomate</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">The faster you fill, the closer you get to your goals.</p>

          <div className="mt-8">
            <div className="flex rounded-md bg-gray-100 p-1">
                <button onClick={() => setAuthMethod('password')} className={`w-1/2 py-1.5 text-sm font-medium rounded ${authMethod === 'password' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>Password</button>
                <button onClick={() => setAuthMethod('otp')} className={`w-1/2 py-1.5 text-sm font-medium rounded ${authMethod === 'otp' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}>Email OTP</button>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {/* --- EMAIL INPUT (Common for both methods) --- */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email</label>
              <AuthInput id="email" type="email" placeholder="Enter your email" icon={<MailIcon />} value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent}/>
            </div>

            {/* --- PASSWORD METHOD --- */}
            {authMethod === 'password' && (
              <>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 sr-only">Password</label>
                  <AuthInput id="password" type="password" placeholder="Enter your password" icon={<LockIcon />} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm font-medium text-[#312E81] hover:text-indigo-800">Forgot Password?</a>
                </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#312E81] hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                    {loading ? 'Signing In...' : 'Login'}
                </button>
              </>
            )}

            {/* --- OTP METHOD --- */}
            {authMethod === 'otp' && !otpSent && (
                <button type="button" onClick={handleSendOtp} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#312E81] hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send OTP</button>
            )}
            
            {authMethod === 'otp' && otpSent && (
                <>
                    <div>
                        <label htmlFor="otp" className="text-sm font-medium text-gray-700 sr-only">OTP</label>
                        <AuthInput id="otp" type="text" placeholder="Enter 6-digit OTP" icon={<KeyIcon />} value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                     <div className="text-right">
                        <button type="button" onClick={() => setOtpSent(false)} className="text-sm font-medium text-[#312E81] hover:text-indigo-800">Change Email</button>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#312E81] hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Verify & Login</button>
                </>
            )}
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-[#312E81] hover:text-indigo-800">
              Create an account
            </a>
          </p>
        </div>
      </div>

      {/* Right Panel: Image and Quote */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-12 relative overflow-hidden">
         <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=1973&auto=format&fit=crop" 
                alt="Abstract background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#312E81] to-indigo-600 opacity-80"></div>
         </div>
         <div className="relative z-10 max-w-md text-white text-center">
            <blockquote className="text-2xl font-semibold italic">
                "The future belongs to those who believe in the beauty of their dreams."
            </blockquote>
            <p className="mt-4 text-lg">- Eleanor Roosevelt</p>
         </div>
      </div>
    </div>
  );
}

export default LoginPage;
