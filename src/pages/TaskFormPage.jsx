import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTask, createTask, updateTask } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchTask();
    }
  }, [id]);

  async function fetchTask() {
    setFetching(true);
    try {
      const data = await getTask(id);
      const task = data.data.task;
      setTitle(task.title);
      setDescription(task.description || '');
      setCompleted(task.completed);
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(err.message || 'Failed to load task');
      }
    } finally {
      setFetching(false);
    }
  }

  function validate() {
    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.trim().length > 200) {
      errors.title = 'Title must be under 200 characters';
    }
    if (description.length > 2000) {
      errors.description = 'Description must be under 2000 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await updateTask(id, {
          title: title.trim(),
          description: description.trim(),
          completed,
        });
      } else {
        await createTask(title.trim(), description.trim(), completed);
      }
      navigate('/tasks');
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else if (err.data && err.data.errors) {
        const errors = {};
        err.data.errors.forEach((e) => {
          errors[e.field] = e.message;
        });
        setFieldErrors(errors);
      } else {
        setError(err.message || 'Failed to save task');
      }
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <LoadingSpinner message="Loading task..." />;
  }

  if (error && !title) {
    return <ErrorMessage message={error} onRetry={fetchTask} />;
  }

  return (
    <div className="task-form-page">
      <Link to="/tasks" className="back-link">← Back to Tasks</Link>
      <h1>{isEditMode ? 'Edit Task' : 'Create New Task'}</h1>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            disabled={loading}
          />
          {fieldErrors.title && (
            <span className="field-error">{fieldErrors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={4}
            disabled={loading}
          />
          {fieldErrors.description && (
            <span className="field-error">{fieldErrors.description}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={loading}
            />
            Completed
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Task' : 'Create Task')}
          </button>
          <Link to="/tasks" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default TaskFormPage;
