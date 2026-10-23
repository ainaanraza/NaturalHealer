import React, { useState } from 'react';
import { signInUser, signInWithGoogle } from '../services/authService';
import AuthLayout from './AuthLayout';
import Icon, { GoogleMark } from './Icon';

const Login = ({ onLogin, onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    const result = await signInUser(formData.email, formData.password);

    if (result.success) {
      onLogin(result.user);
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  const handleSocialLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const result = await signInWithGoogle();

    if (result.success) {
      onLogin(result.user);
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your remedies and saved conversations."
      footer={
        <>
          New to Natural Healer?{' '}
          <button className="text-link" onClick={onSwitchToSignup} disabled={isLoading}>
            Create an account
          </button>
        </>
      }
    >
      <button className="btn btn-paper btn-lg btn-block" onClick={handleSocialLogin} disabled={isLoading}>
        <GoogleMark />
        Continue with Google
      </button>

      <div className="auth-divider">or with email</div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {errorMessage && (
          <div className="notice notice-chilli" role="alert">
            <Icon name="alert" size={18} />
            {errorMessage}
          </div>
        )}

        <div className="field">
          <label htmlFor="email" className="field-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <div className="auth-row">
            <label htmlFor="password" className="field-label">Password</label>
            <button
              type="button"
              className="text-link"
              onClick={onSwitchToForgotPassword}
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            className="field-input"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && <span id="password-error" className="field-error">{errors.password}</span>}
        </div>

        <button type="submit" className="btn btn-leaf btn-lg btn-block" disabled={isLoading}>
          {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
          {isLoading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
