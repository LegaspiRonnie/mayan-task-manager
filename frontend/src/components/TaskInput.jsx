import { useState } from 'react';
import { API_URL } from '../config.js';


const InputTask = ({ onCreated, onNotify }) => {
    const [title,             setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return setError("Task title is required.");
        }

        setIsLoading(true);
        setError('');

        try {
                const body = { title, description };
            const response = await fetch(`${API_URL}/api/tasks`, {
                    method:  'POST',
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(body)
            });
                const jsonData = await response.json();

            if (!response.ok) {
                throw new Error(jsonData.message || 'Unable to add task.');
            }

                setTitle('');
                setDescription('');
                setIsOpen(false);
                onCreated(jsonData.task);
        } catch (err) {
            onNotify('error', err.message || 'Unable to add task.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setError('');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                <h1 className="h2 text-primary m-0">Task Manager - Mayan</h1>
                <button
                    className="btn btn-primary d-flex align-items-center gap-1"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="bi bi-plus-lg"></i> + Add Task
                </button>
            </div>
            {isOpen && (
                <>
                    <div className="modal-backdrop fade show" onClick={handleClose}></div>

                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content shadow">
                                
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title fw-bold">Add New Task</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <form className="modal-body" onSubmit={onSubmitForm}>
                                    <div className="mb-3">
                                        <label htmlFor="taskTitle" className="form-label fw-semibold">
                                            Task Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="taskTitle"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            placeholder="Enter task title"
                                            value={title}
                                            onChange={e => {
                                                setTitle(e.target.value);
                                                if (e.target.value.trim()) setError('');
                                            }}
                                        />
                                        {error && <div className="invalid-feedback fw-semibold mt-1">{error}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="taskDescription" className="form-label fw-semibold">
                                            Task Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="taskDescription"
                                            rows="4"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            placeholder="Enter task description"
                                        ></textarea>
                                    </div>

                                    <div className="modal-footer px-0 pb-0 border-0 pt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary d-flex align-items-center gap-2" 
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Saving Task...' : 'Add Task'}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default InputTask;
