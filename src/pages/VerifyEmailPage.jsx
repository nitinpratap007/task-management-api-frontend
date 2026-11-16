import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { verifyEmail, resendVerification } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState(null);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verify();
    } else {
      setLoading(false);
    }
  }, [token]);

  async function verify() {
    setLoading(true);
    setError(null);
    try {
      await verifyEmail(token);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setResending(true);
    setResendMsg(null);
    try {
      await resendVerification(email);
      setResendMsg('If an unverified account exists, a new verification link has been sent.');
    } catch (err) {
      setResendMsg(err.message || 'Failed to resend');
    } finally {
      setResending(false);
    }
  }

  if (loading) {
    return <LoadingSpinner message="Verifying email..." />;
  }

  if (success) {
    return (
      <div className="auth-page">
        <h1>✅ Email Verified!</h1>
        <p className="info-text" style={{ color: '#27ae60', fontSize: '1.1rem' }}>
          Your email has been verified successfully.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Verify Email</h1>
      {error && <ErrorMessage message={error} onRetry={verify} />}

      {!token && (
        <>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            No verification token provided. Enter your email to resend the verification link.
          </p>
          <form onSubmit={handleResend}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={resending}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={resending} style={{ width: '100%' }}>
              {resending ? 'Sending...' : 'Resend Verification'}
            </button>
          </form>
          {resendMsg && <p className="info-text" style={{ marginTop: '12px' }}>{resendMsg}</p>}
        </>
      )}

      <p className="auth-link">
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default VerifyEmailPage;
