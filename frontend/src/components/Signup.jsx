import React, { useState } from 'react';
import '../styles/Auth.css';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Mock signup delay
    setTimeout(() => {
      // Store user session in localStorage
      const userData = {
        name: formData.name,
        email: formData.email,
        signupTime: new Date().toISOString(),
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('naturalHealer_user', JSON.stringify(userData));
      localStorage.setItem('naturalHealer_isAuthenticated', 'true');
      
      setIsLoading(false);
      onSignup(userData);
    }, 1500);
  };

  const handleSocialSignup = (provider) => {
    setIsLoading(true);
    
    // Mock social signup
    setTimeout(() => {
      const userData = {
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        signupTime: new Date().toISOString(),
        loginTime: new Date().toISOString(),
        provider: provider
      };
      
      localStorage.setItem('naturalHealer_user', JSON.stringify(userData));
      localStorage.setItem('naturalHealer_isAuthenticated', 'true');
      
      setIsLoading(false);
      onSignup(userData);
    }, 1500);
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start your journey to natural wellness</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="name" className="auth-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`auth-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.name && <span className="auth-error">{errors.name}</span>}
            </div>

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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.password && <span className="auth-error">{errors.password}</span>}
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill ${
                      formData.password.length === 0 ? '' :
                      formData.password.length < 6 ? 'weak' :
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) ? 'strong' : 'medium'
                    }`}
                  ></div>
                </div>
                <span className="strength-text">
                  {formData.password.length === 0 ? 'Enter password' :
                   formData.password.length < 6 ? 'Weak' :
                   /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) ? 'Strong' : 'Medium'}
                </span>
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirmPassword" className="auth-label">
                <span className="label-icon">✓</span>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}
            </div>

            <div className="auth-form-group">
              <label className={`auth-checkbox ${errors.agreeToTerms ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkbox-label">
                  I agree to the{' '}
                  <a href="#" className="auth-link">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="auth-link">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeToTerms && <span className="auth-error">{errors.agreeToTerms}</span>}
            </div>

            <button
              type="submit"
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="button-icon">→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or sign up with</span>
          </div>

          <div className="auth-social">
            <button
              className="auth-social-button google"
              onClick={() => handleSocialSignup('google')}
              disabled={isLoading}
            >
              <span className="social-icon">🔍</span>
              Google
            </button>
            <button
              className="auth-social-button facebook"
              onClick={() => handleSocialSignup('facebook')}
              disabled={isLoading}
            >
              <span className="social-icon">👤</span>
              Facebook
            </button>
            <button
              className="auth-social-button apple"
              onClick={() => handleSocialSignup('apple')}
              disabled={isLoading}
            >
              <span className="social-icon">🍎</span>
              Apple
            </button>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{' '}
              <button
                className="auth-link primary"
                onClick={onSwitchToLogin}
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <div className="auth-info-card">
            <div className="info-icon">🎯</div>
            <h3 className="info-title">Personalized Care</h3>
            <p className="info-desc">
              Get customized natural healing recommendations based on your unique health needs
            </p>
          </div>
          <div className="auth-info-card">
            <div className="info-icon">🌱</div>
            <h3 className="info-title">Evidence-Based</h3>
            <p className="info-desc">
              All our remedies are backed by traditional Ayurvedic wisdom and modern research
            </p>
          </div>
          <div className="auth-info-card">
            <div className="info-icon">🔒</div>
            <h3 className="info-title">Secure & Private</h3>
            <p className="info-desc">
              Your health data is encrypted and protected with industry-standard security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
