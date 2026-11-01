import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTask, deleteTask } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  async function fetchTask() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTask(id);
      setTask(data.data.task);
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else if (err.status === 404) {
        setError('Task not found');
      } else {
        setError(err.message || 'Failed to load task');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await deleteTask(id);
      navigate('/tasks');
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading task..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTask} />;
  }

  if (!task) {
    return <ErrorMessage message="Task not found" />;
  }

  return (
    <div className="task-details-page">
      <Link to="/tasks" className="back-link">← Back to Tasks</Link>
      <h1>{task.title}</h1>

      <div className="task-details-card">
        <div className="detail-row">
          <strong>Status:</strong>
          <span className={task.completed ? 'status-done' : 'status-pending'}>
            {task.completed ? '✅ Completed' : '⏳ Pending'}
          </span>
        </div>

        <div className="detail-row">
          <strong>Description:</strong>
          <p>{task.description || 'No description provided'}</p>
        </div>

        <div className="detail-row">
          <strong>Created:</strong>
          <span>{task.createdAt}</span>
        </div>

        <div className="detail-row">
          <strong>Last Updated:</strong>
          <span>{task.updatedAt}</span>
        </div>
      </div>

      <div className="task-actions">
        <Link to={`/tasks/${id}/edit`} className="btn btn-primary">Edit Task</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete Task</button>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
