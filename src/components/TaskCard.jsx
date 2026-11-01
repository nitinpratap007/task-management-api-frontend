import { Link } from 'react-router-dom';

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
