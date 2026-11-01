function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <p className="error-text">⚠️ {message || 'Something went wrong'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-retry">Try Again</button>
      )}
    </div>
  );
}

export default ErrorMessage;
