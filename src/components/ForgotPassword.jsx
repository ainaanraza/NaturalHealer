import React, { useState } from 'react';
import { resetPassword } from '../services/authService';
import AuthLayout from './AuthLayout';
import Icon from './Icon';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resent, setResent] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    const result = await resetPassword(email);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    setIsLoading(true);
    setResent(false);
    const result = await resetPassword(email);
    setIsLoading(false);

    if (result.success) {
      setResent(true);
    } else {
      setError(result.error);
    }
  };

  const backLink = (
    <button className="text-link" onClick={onBackToLogin} disabled={isLoading}>
      Back to log in
    </button>
  );

  if (isSuccess) {
    return (
      <AuthLayout title="Check your email" footer={backLink}>
        <div className="auth-sent">
          <span className="auth-sent-icon"><Icon name="mail" size={26} /></span>
          <p className="t-lead">
            We sent a reset link to <span className="email-highlight">{email}</span>.
          </p>
          <ol className="auth-steps">
            <li>Open the email from Natural Healer. Check spam if it isn't there.</li>
            <li>Follow the link inside.</li>
            <li>Choose a new password and log in.</li>
          </ol>

          {resent && (
            <div className="notice notice-ok" role="status">
              <Icon name="check" size={18} />
              Sent again. It can take a minute to arrive.
            </div>
          )}
          {error && (
            <div className="notice notice-chilli" role="alert">
              <Icon name="alert" size={18} />
              {error}
            </div>
          )}

          <button className="btn btn-paper btn-lg btn-block" onClick={handleResend} disabled={isLoading}>
            {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
            {isLoading ? 'Sending…' : 'Resend email'}
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email you signed up with and we'll send you a link to set a new one."
      footer={backLink}
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email" className="field-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@example.com"
            value={email}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!error}
            aria-describedby={error ? 'email-error' : undefined}
          />
          {error && <span id="email-error" className="field-error">{error}</span>}
        </div>

        <button type="submit" className="btn btn-leaf btn-lg btn-block" disabled={isLoading}>
          {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
          {isLoading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
