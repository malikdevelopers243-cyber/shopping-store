import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.message);
    }
  };

  return (

                <div className="auth-container" style={{
                  backgroundImage: `url('/images/login photo.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                  width: '100%',
                  height: '100vh',
                  overflow: 'hidden',
                  display: 'flex',
                  // alignItems: 'center',
                  // justifyContent: 'center'
                }}>
          

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-icon"></div>
            <h1 className="auth-title">Asad Malik</h1>
            <p className="auth-subtitle">Welcome back to your shopping destination</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                <span className="error-icon"></span>
                {error}
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
                  placeholder="Enter your Email"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
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

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-login"
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider">
            <span>Don't have an account?</span>
          </div>

          <div className="auth-footer">
            <p>
              Create a new account{' '}
              <Link to="/signup" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google-btn">
               Google
            </button>
            <button type="button" className="social-btn facebook-btn">
          Facebook
            </button>
          </div>
        </div>

        <div className="auth-side-message">
          <h2>Join Our Community</h2>
          <p><li>Discover exclusive deals and offers</li></p>
          <p> <li>Fast & secure shopping experience</li></p>
          <p> <li>Multiple payment options</li></p>
          <p> <li>Free shipping on orders over PKR 2000</li></p>
          <p><li>Your Online Trust</li></p>
          <p> <li>Payment fast</li></p>
          <p> <li>Fast delivery</li></p>
          <p> <li>Enjoy your Events</li></p>
        </div>
      </div>
    </div>
  );
};

export default Login;