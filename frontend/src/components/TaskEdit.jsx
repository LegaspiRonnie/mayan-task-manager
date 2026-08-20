import { useState } from 'react';
import AlertMessage from './AlertMessage.jsx';
import { API_URL } from '../config.js';

const TaskEdit = ({ task, onClose, onSaved }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [completed, setCompleted] = useState(Boolean(task.completed));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmitForm = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            setError('Task title is required.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ title, description, completed }),
            });
            const jsonData = await response.json();

            if (!response.ok) {
                throw new Error(jsonData.message || 'Unable to update task.');
            }

            onSaved(jsonData.task);
        } catch (requestError) {
            setError(requestError.message || 'Unable to update task.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold">Edit Task</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>

                        <form className="modal-body" onSubmit={onSubmitForm}>
                            <AlertMessage type="error" message={error} onClose={() => setError('')} />

                            <div className="mb-3">
                                <label htmlFor="editTaskTitle" className="form-label fw-semibold">Task Title</label>
                                <input
                                    type="text"
                                    id="editTaskTitle"
                                    className="form-control"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editTaskDescription" className="form-label fw-semibold">Task Description</label>
                                <textarea
                                    id="editTaskDescription"
                                    className="form-control"
                                    rows="4"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="editTaskCompleted"
                                    checked={completed}
                                    onChange={(event) => setCompleted(event.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="editTaskCompleted">Completed</label>
                            </div>

                            <div className="modal-footer px-0 pb-0 border-0">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskEdit;
