import React, { useState } from 'react';
import { signUpUser, signInWithGoogle } from '../services/authService';
import AuthLayout from './AuthLayout';
import Icon, { GoogleMark } from './Icon';

const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

function passwordStrength(password) {
  if (!password) return 0;
  if (password.length < 6) return 1;
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password) ? 3 : 2;
}

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
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Please confirm you understand this before continuing';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');

    const result = await signUpUser(formData.email, formData.password, formData.name);

    if (result.success) {
      onSignup(result.user);
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  const handleSocialSignup = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const result = await signInWithGoogle();

    if (result.success) {
      onSignup(result.user);
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  const strength = passwordStrength(formData.password);

  const field = (name, label, props) => (
    <div className="field">
      <label htmlFor={name} className="field-label">{label}</label>
      <input
        id={name}
        name={name}
        className="field-input"
        value={formData[name]}
        onChange={handleChange}
        disabled={isLoading}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...props}
      />
      {errors[name] && <span id={`${name}-error`} className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free, and takes less than a minute."
      footer={
        <>
          Already have an account?{' '}
          <button className="text-link" onClick={onSwitchToLogin} disabled={isLoading}>
            Log in
          </button>
        </>
      }
    >
      <button className="btn btn-paper btn-lg btn-block" onClick={handleSocialSignup} disabled={isLoading}>
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

        {field('name', 'Name', { type: 'text', autoComplete: 'name', placeholder: 'What should we call you?' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}

        <div className="field">
          <label htmlFor="password" className="field-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            className="field-input"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.password}
            aria-describedby="password-strength"
          />
          {errors.password ? (
            <span className="field-error">{errors.password}</span>
          ) : (
            <div className="strength" data-level={strength} id="password-strength">
              <div className="strength-bars" aria-hidden="true"><span /><span /><span /></div>
              <span>{strength ? strengthLabels[strength] : 'Mix upper, lower case and numbers'}</span>
            </div>
          )}
        </div>

        {field('confirmPassword', 'Confirm password', { type: 'password', autoComplete: 'new-password', placeholder: 'Type it once more' })}

        <div className="field">
          <label className="check">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.agreeToTerms}
            />
            <span>
              I understand Natural Healer offers general wellness information, not medical advice.
            </span>
          </label>
          {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
        </div>

        <button type="submit" className="btn btn-leaf btn-lg btn-block" disabled={isLoading}>
          {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
