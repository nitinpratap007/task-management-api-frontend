import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <h1>📧 Reset Link Sent</h1>
        <p className="info-text" style={{ color: '#27ae60', fontSize: '1.1rem' }}>
          If an account exists with this email, a password reset link has been sent.
        </p>
        <p style={{ marginTop: '12px', color: '#666' }}>
          Check your email (and Mailtrap inbox) for the reset token.
        </p>
        <Link to="/login" className="btn btn-secondary" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Forgot Password</h1>
      {error && <div className="error-container"><p className="error-text">⚠️ {error}</p></div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <p className="auth-link">
        Remember your password? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
