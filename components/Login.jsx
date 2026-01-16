import React, { useState } from 'react';
import { signInUser } from '../services/authService';
import '../styles/Auth.css';

const Login = ({ onLogin, onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    
    // Use Firebase authentication
    const result = await signInUser(formData.email, formData.password);
    
    if (result.success) {
      onLogin(result.user);
    } else {
      setErrorMessage(result.error);
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    // Social login can be implemented later with Firebase Auth providers
    setErrorMessage(`${provider} login coming soon!`);
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-gradient-orb orb-1"></div>
        <div className="auth-gradient-orb orb-2"></div>
        <div className="auth-gradient-orb orb-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="auth-logo-icon">🌿</span>
              <span className="auth-logo-text">Natural Healer</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your healing journey</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="auth-error-banner">
                <span className="error-icon">⚠️</span>
                {errorMessage}
              </div>
            )}
            
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`auth-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`auth-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.password && <span className="auth-error">{errors.password}</span>}
            </div>

            <div className="auth-options">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <button
                type="button"
                className="auth-link"
                onClick={onSwitchToForgotPassword}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="button-icon">→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="auth-social">
            <button
              className="auth-social-button google"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <span className="social-icon">🔍</span>
              Google
            </button>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <button
                className="auth-link primary"
                onClick={onSwitchToSignup}
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <div className="auth-info-card">
            <div className="info-icon">✨</div>
            <h3 className="info-title">Natural Healing Solutions</h3>
            <p className="info-desc">
              Access personalized Ayurvedic remedies and expert guidance for your wellness journey
            </p>
          </div>
          <div className="auth-info-card">
            <div className="info-icon">🤖</div>
            <h3 className="info-title">AI-Powered Assistance</h3>
            <p className="info-desc">
              Get instant answers to your health questions from our intelligent AI assistant
            </p>
          </div>
          <div className="auth-info-card">
            <div className="info-icon">📊</div>
            <h3 className="info-title">Track Your Progress</h3>
            <p className="info-desc">
              Monitor your healing journey and discover what works best for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
