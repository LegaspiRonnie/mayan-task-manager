# Task Manager Backend

## Setup

1. Create the `task_manager` PostgreSQL database and the `tasks` table using `database.sql`.
2. Update the PostgreSQL connection settings in `db_con.js` if needed.
3. Install dependencies with `npm install`.
4. Start the API with `npm start`.

The API runs at `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks?search=report&status=completed` | Search titles and filter by status |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Edit a task or set `completed` to `true` or `false` |
| DELETE | `/api/tasks/:id` | Delete a task |

For the `status` filter, use `all`, `incomplete`, or `completed`. Search and status filters work together.
