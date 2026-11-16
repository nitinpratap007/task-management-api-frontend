import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/api';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenFromUrl = searchParams.get('token');

  const [token, setToken] = useState(tokenFromUrl || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function validate() {
    const errors = {};
    if (!token.trim()) errors.token = 'Reset token is required';
    if (!newPassword) errors.newPassword = 'New password is required';
    else if (newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
    else if (newPassword.length > 72) errors.newPassword = 'Password must be under 72 characters';
    if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err) {
      if (err.data && err.data.errors) {
        const errors = {};
        err.data.errors.forEach((e) => {
          errors[e.field] = e.message;
        });
        setFieldErrors(errors);
      } else {
        setError(err.message || 'Failed to reset password');
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <h1>✅ Password Reset!</h1>
        <p className="info-text" style={{ color: '#27ae60', fontSize: '1.1rem' }}>
          Your password has been reset successfully.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Reset Password</h1>
      {error && <div className="error-container"><p className="error-text">⚠️ {error}</p></div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="token">Reset Token</label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste token from email"
            disabled={loading}
          />
          {fieldErrors.token && <span className="field-error">{fieldErrors.token}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
            disabled={loading}
          />
          {fieldErrors.newPassword && <span className="field-error">{fieldErrors.newPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat new password"
            disabled={loading}
          />
          {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="auth-link">
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
