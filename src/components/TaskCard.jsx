import { Link } from 'react-router-dom';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

function TaskCard({ task, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
          {task.completed ? '✅ Done' : '⏳ Pending'}
        </span>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      {task.dueDate && (
        <div className="task-due-date">
          <span className={`due-badge ${isOverdue(task.dueDate) ? 'overdue' : 'upcoming'}`}>
            {isOverdue(task.dueDate) ? '⚠️ Overdue' : '📅 Due'}: {formatDate(task.dueDate)}
          </span>
          {task.reminderSent && <span className="reminder-sent">🔔 Reminder sent</span>}
        </div>
      )}
      <div className="task-card-footer">
        <small>Created: {task.createdAt}</small>
        <div className="task-actions">
          <Link to={`/tasks/${task.id}`} className="btn btn-sm btn-view">View</Link>
          <Link to={`/tasks/${task.id}/edit`} className="btn btn-sm btn-edit">Edit</Link>
          <button onClick={() => onDelete(task.id)} className="btn btn-sm btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
