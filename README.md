# Task Manager

A local full-stack task manager built with React, Express, and PostgreSQL.

## Live Demo

Try the deployed app: [Task Manager Live Demo](https://hosted-task-manager-mayan.vercel.app/)

## Screenshots

Add the images as `screenshots/screenshot1.png` and `screenshots/screenshot2.png` in the project root to display them here.

![Task Manager screenshot 1](screenshots/screenshot1.png)

![Task Manager screenshot 2](screenshots/screenshot2.png)

## Features

- Create, edit, complete, and delete tasks
- Search tasks by title
- Filter all, incomplete, or completed tasks
- Combine search and status filters
- Responsive Bootstrap layout
- Validation and success/error notifications

## Requirements

- Node.js 18 or newer
- PostgreSQL running locally

## Project Structure

```text
backend/
  database/
    database.sql
    db_con.js
  routes/
  server.js
frontend/
  src/
```

## Setup

### 1. Create the database

Create a PostgreSQL database named `task_manager`, then run:

```text
backend/database/database.sql
```

The current local connection uses:

```text
Host: localhost
Port: 5432
User: postgres
Database: task_manager
```

Update the password in `backend/database/db_con.js` if your local PostgreSQL password is different.

### 2. Install dependencies

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Start the backend

Open a terminal and run:

```bash
cd backend
npm start
```

The API runs at `http://localhost:3000`.

### 4. Start the frontend

Open a second terminal and run:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks?search=report&status=completed` | Search and filter tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Edit a task |
| PUT | `/api/tasks/complete/:id` | Complete a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Valid status values are `all`, `incomplete`, and `completed`.

## Checks

Run the frontend checks before committing:

```bash
cd frontend
npm run lint
npm run build
```

This repository is currently configured for local development only.
