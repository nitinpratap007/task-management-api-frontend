const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

function getHeaders(includeAuth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }
  const data = await response.json();
  if (!response.ok) {
    const message = data.message || data.errors?.[0]?.message || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function register(name, email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(response);
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'GET',
    headers: getHeaders(true),
  });
  return handleResponse(response);
}

export async function getTask(id) {
  const response = await fetch(`${API_URL}/api/tasks/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: getHeaders(true),
  });
  return handleResponse(response);
}

export async function createTask(title, description, completed) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({ title, description, completed }),
  });
  return handleResponse(response);
}

export async function updateTask(id, updates) {
  const response = await fetch(`${API_URL}/api/tasks/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/api/tasks/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  return handleResponse(response);
}

export async function checkHealth() {
  const response = await fetch(`${API_URL}/api/health`);
  return handleResponse(response);
}
