import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { forgetPassword, verifyResetCode, resetPassword, isLoading } = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const result = await forgetPassword(email);
    
    if (result.success) {
      setSuccess(result.message);
      setStep(2);
    } else {
      setError(result.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!code) {
      setError('Please enter the code');
      return;
    }

    const result = await verifyResetCode(code);
    
    if (result.success) {
      setSuccess(result.message);
      setStep(3);
    } else {
      setError(result.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await resetPassword(newPassword, confirmPassword);
    
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">Recover your account access</p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendCode} className="auth-form">
              {error && (
                <div className="error-message">
                  <span className="error-icon"></span>
                  {error}
                </div>
              )}

              {success && (
                <div className="success-message">
                  <span className="success-icon"></span>
                  {success}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-input"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <p className="form-hint">
                Enter the email address associated with your account. We'll send you a code to reset your password.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-login"
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Sending Code...
                  </>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="auth-form">
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              {success && (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  {success}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="code" className="form-label">Reset Code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    className="form-input"
                    maxLength="6"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <p className="form-hint">
                A 6-digit code has been sent to <strong>{email}</strong>. Check your browser console (F12) for the code during demo.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-login"
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setCode('');
                  setError('');
                  setSuccess('');
                }}
                className="btn-back"
              >
                Back
              </button>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="auth-form">
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              {success && (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  {success}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <p className="form-hint">
                Password must be at least 6 characters long.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-login"
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  setNewPassword('');
                  setConfirmPassword('');
                  setError('');
                  setSuccess('');
                }}
                className="btn-back"
              >
                Back
              </button>
            </form>
          )}

          <div className="divider">
            <span>Remember your password?</span>
          </div>

          <div className="auth-footer">
            <p>
              <Link to="/login" className="signup-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-side-message">
          <h2>Password Reset</h2>
          <p> Secure reset process</p>
          <p> Verification code sent</p>
          <p> Create a new password</p>
          <p> Access your account</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;