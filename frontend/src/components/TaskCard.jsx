import { useEffect, useState } from 'react';
import TaskEdit from './TaskEdit.jsx';
import { API_URL } from '../config.js';


const TaskCard = ({ createdTask, search, status, onNotify }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [deletedTaskId, setDeletedTaskId] = useState(null);
    const deleteTask = async (id) => {
        try{
            if (!window.confirm("Are you sure you want to delete this task?")) {
                return;
            }
            const response = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
                setDeletedTaskId(id);
                onNotify('success', 'Task deleted successfully!');
            } else {
                const jsonData = await response.json();
                throw new Error(jsonData.message || 'Unable to delete task.');
            }
        } catch (err) {
            onNotify('error', err.message || 'Unable to delete task.');
        }
    }
    const editTask = (task) => {
        setSelectedTask(task);
    };

    const completeTask = async (task) => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/complete/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: true }),
            });
            const jsonData = await response.json();

            if (!response.ok) {
                throw new Error(jsonData.message || 'Unable to complete task.');
            }

            setTasks(currentTasks => currentTasks.map(currentTask => (
                currentTask.id === jsonData.task.id ? jsonData.task : currentTask
            )));
            onNotify('success', 'Task completed successfully!');
        } catch (requestError) {
            onNotify('error', requestError.message || 'Unable to complete task.');
        }
    };

    const updateTask = (updatedTask) => {
        setTasks(currentTasks => currentTasks.map(task => (
            task.id === updatedTask.id ? updatedTask : task
        )));
        setSelectedTask(null);
        onNotify('success', 'Task updated successfully!');
    };

    useEffect(() => {
        let isMounted = true;

        const fetchTasks = async () => {
            try {
                const params = new URLSearchParams({ search, status });
                const response = await fetch(`${API_URL}/api/tasks?${params}`);
                const jsonData = await response.json();

                if (isMounted) {
                    if (!response.ok) {
                        throw new Error(jsonData.message || 'Unable to fetch tasks.');
                    }

                    setTasks(Array.isArray(jsonData.tasks) ? jsonData.tasks : []);
                }
            } catch (error) {
                if (isMounted) {
                    onNotify('error', error.message || 'Unable to fetch tasks.');
                    setTasks([]);
                }
            }
        };

        fetchTasks();

        return () => {
            isMounted = false;
        };
    }, [onNotify, search, status]);

    const matchesSearch = !createdTask
        || !search
        || createdTask.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !createdTask
        || status === 'all'
        || (status === 'completed' && createdTask.completed)
        || (status === 'incomplete' && !createdTask.completed);
    const displayedTasks = createdTask
        && createdTask.id !== deletedTaskId
        && matchesSearch
        && matchesStatus
        && !tasks.some(task => task.id === createdTask.id)
        ? [createdTask, ...tasks]
        : tasks;

    return (
        <>
        <div className="container mt-3">
            {displayedTasks.map(task => (
                <div key={task.id} className="card w-100 mb-3 shadow-sm border-start border-2 border-primary task-card">
                    <div className="card-body p-3">

                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                            <div>
                                <h5 className="card-title fw-bold mb-1 text-truncate">{task.title}</h5>
                            </div>

                            <div className="btn-group gap-1 flex-shrink-0">
                                
                                <button className="btn btn-sm btn-outline-primary rounded"
                                    onClick={() => editTask(task)}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger rounded"
                                        onClick={() => deleteTask(task.id)}
                                >
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </div>  
                        </div>

                        <p className="card-text text-muted task-description mb-2">
                            {task.description || "No description provided."}
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center gap-2 mt-2 pt-2 border-top task-footer">
                            <span className={`badge rounded-pill ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {task.completed ? 'completed' : 'incomplete'}
                            </span>
                            
                            {!task.completed && (
                                <button
                                    className="btn btn-sm btn-success d-flex align-items-center gap-1 flex-shrink-0"
                                    onClick={() => completeTask(task)}
                                >
                                    <i className="bi bi-check2-circle"></i> 
                                    <span className="d-none d-sm-inline">Mark as Completed</span>
                                    <span className="d-sm-none">Complete</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {displayedTasks.length === 0 && (
                <div className="text-center text-muted my-4">No tasks found.</div>
            )}
        </div>
        {selectedTask && (
            <TaskEdit
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onSaved={updateTask}
            />
        )}
        </>
    );
}

export default TaskCard;
