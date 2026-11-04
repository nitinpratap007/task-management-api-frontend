# Task Management Frontend

A React frontend for the Task Management REST API, built with Vite and React Router.

## Tech Stack

- **Framework:** React 18+
- **Build Tool:** Vite 6
- **Routing:** React Router v7
- **HTTP Client:** fetch (native)
- **Styling:** Plain CSS (responsive)

## Prerequisites

- Node.js v18 or higher
- npm
- WA-2 backend running on http://localhost:3000 (or deployed URL)

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

# 4. Edit .env if needed
```

## Environment Setup

Create `.env` in the project root:

```env
# Local development
VITE_API_URL=http://localhost:3000

# Production (set in Vercel dashboard)
# VITE_API_URL=https://your-backend.onrender.com
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

## Deploy to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up (GitHub login recommended)

### Step 2: Import Project
1. Dashboard → **Add New** → **Project**
2. Import your GitHub repo: `task-management-frontend`
3. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Set Environment Variables
In Vercel dashboard → Settings → Environment Variables:
| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your deployed backend URL (e.g., `https://task-management-api.onrender.com`) |

### Step 4: Deploy
Click **Deploy**. Vercel will build and deploy.

Your frontend URL will be: `https://task-management-frontend.vercel.app`

### Step 5: SPA Routing (Important!)
For React Router to work on Vercel, create `vercel.json` in the project root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Commit and push this file, then redeploy.

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
