# Task Management Frontend

A React frontend for the Task Management REST API (WA-2), built with Vite and React Router.

## Tech Stack

- **Framework:** React 18+
- **Build Tool:** Vite 6
- **Routing:** React Router v7
- **HTTP Client:** fetch (native)
- **Styling:** Plain CSS (responsive)

## Prerequisites

- Node.js v18 or higher
- npm
- WA-2 backend running on http://localhost:3000

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/task-management-frontend.git
cd task-management-frontend

# 2. Install dependencies
npm install

# 3. Create environment file
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux

# 4. Edit .env if needed (default: http://localhost:3000)
```

## Environment Setup

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:3000
```

## Running Locally

### Start Backend (Terminal 1)
```bash
cd ../task-management-api
npm run dev
```

### Start Frontend (Terminal 2)
```bash
npm run dev
```

Open http://localhost:5173/ in your browser.

## Features

- User registration and login
- JWT token storage in localStorage
- View all tasks
- View task details
- Create new tasks
- Edit existing tasks
- Delete tasks with confirmation
- Loading, error, and empty states
- Responsive design (mobile + desktop)
- Client-side form validation
- Not-found page for unknown routes

## API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/tasks | List tasks |
| GET | /api/tasks/:id | Get task details |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/health | Health check |

## Project Structure

```
task-management-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── EmptyState.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── TaskListPage.jsx
│   │   ├── TaskDetailsPage.jsx
│   │   ├── TaskFormPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Production Build

```bash
npm run build
npm run preview
```

## Known Limitations

- No refresh token mechanism (token expires after 24h)
- No offline support
- No real-time updates
- Token stored in localStorage (XSS risk in production)
- No automated frontend tests

## Future Improvements

- Add refresh token support
- Add task filtering and search
- Add task categories/tags
- Add dark mode
- Add unit tests with React Testing Library
- Add deployment configuration
