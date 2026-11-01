import { Link } from 'react-router-dom';

function HomePage() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="home-page">
      <h1>📋 Task Management App</h1>
      <p>Manage your tasks efficiently. Create, view, edit, and delete tasks.</p>
      <div className="home-links">
        {isLoggedIn ? (
          <>
            <Link to="/tasks" className="btn btn-primary">View My Tasks</Link>
            <Link to="/tasks/new" className="btn btn-secondary">Create New Task</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
