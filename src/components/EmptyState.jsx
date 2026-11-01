import { Link } from 'react-router-dom';

function EmptyState({ message = 'No tasks yet', showCreateLink = true }) {
  return (
    <div className="empty-container">
      <p className="empty-text">📭 {message}</p>
      {showCreateLink && (
        <Link to="/tasks/new" className="btn btn-primary">Create Your First Task</Link>
      )}
    </div>
  );
}

export default EmptyState;
