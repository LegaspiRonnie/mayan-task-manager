const express = require('express');
const router  = express.Router();
const db_con  = require('../database/db_con')

//________________________________________________________________________________________
//___________________________ CREATE  ____________________________________________________
router.post('/tasks', async (request, response) => {
    try {
        const { title, description } = request.body;

        if (!title?.trim()) {
            return response.status(400).json({
                type:    'error',
                message: 'Title is required.'
            });
        }

        const query = `
            INSERT INTO tasks (title, description)
            VALUES ($1, $2)
            RETURNING *
        `;
        const values = [title.trim(), description || null];
        const result = await db_con.query(query, values);

        return response.status(201).json({
            type:    'success',
            message: 'Task added successfully!',
            task:     result.rows[0]
        });
    } catch (err) {
        console.error('Unable to create task:', err.message);

        return response.status(500).json({
            type:    'error',
            message: 'Unable to create task.'
        });
    }
});

//________________________________________________________________________________________
//___________________________ READ  ______________________________________________________
router.get('/tasks', async (request, response) => {
    try {
        const { search = '', status = 'all' } = request.query;
        const filters = [];
        const values  = [];

        if (!['all', 'completed', 'incomplete'].includes(status)) {
            return response.status(400).json({
                type:    'error',
                message: 'Status must be all, completed, or incomplete.'
            });
        }

        if (search.trim()) {
            values.push(`%${search.trim()}%`);
            filters.push(`title ILIKE $${values.length}`);
        }

        if (status !== 'all') {
            values.push(status === 'completed');
            filters.push(`completed = $${values.length}`);
        }

        const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
        const query = `SELECT * FROM tasks ${whereClause} ORDER BY id DESC`;
        const result = await db_con.query(query, values);

        return response.json({
            type:    'success',
            message: 'Tasks fetched successfully.',
            tasks:    result.rows
        });
    } catch (err) {
        console.error('Unable to fetch tasks:', err.message);

        return response.status(500).json({
            type:    'error',
            message: 'Unable to fetch tasks.'
        });
    }
});

//________________________________________________________________________________________
//___________________________ READ BY ID  ________________________________________________
router.get('/tasks/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);

        if (!Number.isInteger(id)) {
            return response.status(400).json({
                type:    'error',
                message: 'Task ID must be a number.'
            });
        }

        const query  = 'SELECT * FROM tasks WHERE id = $1';
        const result = await db_con.query(query, [id]);

        if (result.rows.length === 0) {
            return response.status(404).json({
                type:    'error',
                message: 'Task not found.'
            });
        }

        return response.json({
            type: 'success',
            task: result.rows[0]
        });
    } catch (err) {
        console.error('Unable to fetch task:', err.message);

        return response.status(500).json({
            type:    'error',
            message: 'Unable to fetch task.'
        });
    }
});

//________________________________________________________________________________________
//___________________________ UPDATE  ____________________________________________________
router.put('/tasks/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);
        const { title, description, completed } = request.body;

        if (!Number.isInteger(id)) {
            return response.status(400).json({
                type:    'error',
                message: 'Task ID must be a number.'
            });
        }

        if (!title?.trim()) {
            return response.status(400).json({
                type:    'error',
                message: 'Title is required.'
            });
        }

        if (typeof completed !== 'boolean') {
            return response.status(400).json({
                type:    'error',
                message: 'Completed must be true or false.'
            });
        }

        const query = `
            UPDATE tasks
            SET title = $1, description = $2, completed = $3
            WHERE id  = $4
            RETURNING *
        `;
        const values = [title.trim(), description || null, completed, id];
        const result = await db_con.query(query, values);

        if (result.rows.length === 0) {
            return response.status(404).json({
                type:    'error',
                message: 'Task not found.'
            });
        }

        return response.json({
            type:    'success',
            message: 'Task updated successfully.',
            task:     result.rows[0]
        });
    } catch (err) {
        console.error('Unable to update task:', err.message);

        return response.status(500).json({
            type:    'error',
            message: 'Unable to update task.'
        });
    }
});
//________________________________________________________________________________________
//___________________________ UPDATE completed  __________________________________________
router.put('/tasks/complete/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);
        const { completed } = request.body;

        if (!Number.isInteger(id)) {
            return response.status(400).json({
                type:    'error',
                message: 'Task ID must be a number.'
            });
        }

        if (typeof completed !== 'boolean') {
            return response.status(400).json({
                type:    'error',
                message: 'Completed must be true or false.'
            });
        }

        const query = `
            UPDATE tasks
            SET completed = $1
            WHERE id = $2
            RETURNING *
        `;
        const values = [completed, id];
        const result = await db_con.query(query, values);

        if (result.rows.length === 0) {
            return response.status(404).json({
                type:    'error',
                message: 'Task not found.'
            });
        }

        return response.json({
            type:    'success',
            message: completed ? 'Task completed successfully.' : 'Task marked as incomplete.',
            task:    result.rows[0]
        });
    } catch (err) {
        console.error('Unable to update task:', err.message);

        return response.status(500).json({
            type:    'error',
            message: 'Unable to update task.'
        });
    }
});

//________________________________________________________________________________________
//___________________________ DELETE  ____________________________________________________
router.delete('/tasks/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);

        if (!Number.isInteger(id)) {
            return response.status(400).json({
                type:    'error',
                message: 'Task ID must be a number.'
            });
        }

        const query  = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const result = await db_con.query(query, [id]);

        if (result.rows.length === 0) {
            return response.status(404).json({
                type:    'error',
                message: 'Task not found or was already deleted.'
            });
        }

        return response.json({
            type:    'success',
            message: 'Task deleted successfully.',
            task:    result.rows[0]
        });
    } catch (err) {
        console.error('Unable to delete task:', err.message);

        return response.status(500).json({
            type:    'error',
            message: 'Unable to delete task.'
        });
    }
});

module.exports = router;