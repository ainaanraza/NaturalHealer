import React, { useState } from 'react';
import '../styles/Auth.css';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    // Mock password reset delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Store reset request in localStorage (for demo purposes)
      localStorage.setItem('naturalHealer_passwordResetEmail', email);
      localStorage.setItem('naturalHealer_passwordResetTime', new Date().toISOString());
    }, 1500);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      alert('Reset link resent to your email!');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-gradient-orb orb-1"></div>
        <div className="auth-gradient-orb orb-2"></div>
        <div className="auth-gradient-orb orb-3"></div>
      </div>

      <div className="auth-container centered">
        <div className="auth-card">
          {!isSuccess ? (
            <>
              <div className="auth-header">
                <div className="auth-icon-large">
                  <span className="icon-emoji">🔑</span>
                </div>
                <h1 className="auth-title">Forgot Password?</h1>
                <p className="auth-subtitle">
                  No worries! Enter your email and we'll send you reset instructions
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-form-group">
                  <label htmlFor="email" className="auth-label">
                    <span className="label-icon">📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`auth-input ${error ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {error && <span className="auth-error">{error}</span>}
                </div>

                <button
                  type="submit"
                  className="auth-button primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <span className="button-icon">→</span>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <button
                  className="auth-link back"
                  onClick={onBackToLogin}
                  disabled={isLoading}
                >
                  <span className="back-icon">←</span>
                  Back to Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="auth-header">
                <div className="auth-icon-large success">
                  <span className="icon-emoji">✉️</span>
                </div>
                <h1 className="auth-title">Check Your Email</h1>
                <p className="auth-subtitle">
                  We've sent password reset instructions to
                </p>
                <p className="email-highlight">{email}</p>
              </div>

              <div className="auth-success-info">
                <div className="success-steps">
                  <div className="success-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Check your inbox</h4>
                      <p>Look for an email from Natural Healer</p>
                    </div>
                  </div>
                  <div className="success-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Click the reset link</h4>
                      <p>Follow the link in the email</p>
                    </div>
                  </div>
                  <div className="success-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Create new password</h4>
                      <p>Set a new secure password</p>
                    </div>
                  </div>
                </div>

                <div className="resend-section">
                  <p className="resend-text">Didn't receive the email?</p>
                  <button
                    className="auth-button secondary"
                    onClick={handleResend}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Resending...' : 'Resend Email'}
                  </button>
                </div>
              </div>

              <div className="auth-footer">
                <button
                  className="auth-link back"
                  onClick={onBackToLogin}
                >
                  <span className="back-icon">←</span>
                  Back to Sign In
                </button>
              </div>
            </>
          )}
        </div>

        <div className="auth-info-cards">
          <div className="info-card-small">
            <div className="info-icon-small">💡</div>
            <p>Check your spam folder if you don't see the email</p>
          </div>
          <div className="info-card-small">
            <div className="info-icon-small">⏱️</div>
            <p>Reset link expires in 24 hours</p>
          </div>
          <div className="info-card-small">
            <div className="info-icon-small">🔒</div>
            <p>Your account security is our priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
