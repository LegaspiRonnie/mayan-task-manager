# Task Manager

A simple full-stack CRUD app built with React, Express, and PostgreSQL. It lets you create, edit, delete, search, and filter tasks.

## Features
- **CRUD Operations:** Create, read, update, and delete tasks easily.
- **Search & Filter:** Search by title or filter by status (All, Incomplete, Completed).
- **Responsive UI:** Made with Bootstrap 5 for desktop and mobile view.
- **Validation:** Built-in error and success indicators + validation alerts.

## Project Structure
```text
backend/
  database/ (database.sql & connection config)
  routes/   (API endpoints)
  server.js
frontend/
  src/      (React source files)
```

## Requirements
- Node.js 18+
- PostgreSQL (Local or Supabase)

## Local Setup

### 1. Clone & Install
```bash
git clone <your-github-repository-url>
cd task-manager

# Install Backend
cd backend && npm install

# Install Frontend
cd ../frontend && npm install
```

### 2. Database Setup
Run the script inside `backend/database/database.sql` on your PostgreSQL or Supabase SQL editor.

### 3. Environment Variables (.env)
Create a `.env` file in both folders based on their templates.

**`backend/.env`**
```env
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
DATABASE_SSL=false # Set to true for Supabase/hosted DB
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:3000
```

### 4. Run the App
Open two separate terminals:

* **Terminal 1 (Backend):** `cd backend && npm start`
* **Terminal 2 (Frontend):** `cd frontend && npm run dev`

Go to `http://localhost:5173` to test the app.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks (supports query `?search=xx&status=xx`) |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Update whole task |
| PUT | `/api/tasks/complete/:id` | Toggle complete status |
| DELETE | `/api/tasks/:id` | Delete a task |

*Note: Valid status values are `all`, `incomplete`, and `completed`.*

## Deployment Quick Guide

### Database (Supabase)
1. Spin up a new Supabase project and run `database.sql`.
2. Copy your connection string from Settings > Database.

### Backend (Railway)
1. Deploy a new service from your GitHub repo.
2. Root directory: `backend` | Start command: `npm start`.
3. Add environment variables (`DATABASE_URL`, `DATABASE_SSL=true`, and `CLIENT_URL`).

### Frontend (Vercel)
1. Import your repo, set Root Directory to `frontend`.
2. Framework preset: **Vite**.
3. Add Environment Variable: `VITE_API_URL` (use your Railway app URL).
