import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="empty-container">
      <h1>404 — Page Not Found</h1>
      <p className="empty-text">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
