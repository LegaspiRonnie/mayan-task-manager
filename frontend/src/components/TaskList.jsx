import { useState } from 'react';
import TaskCard from './TaskCard.jsx';
import TaskFilter from './TaskFilter.jsx';

const TaskList = ({ createdTask, onNotify }) => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');

    return (
        <div className="container task-list-container py-3">
            <div className="row g-3 align-items-start">
                <div className="filter-column">
                    <TaskFilter
                        search={search}
                        status={status}
                        onSearchChange={setSearch}
                        onStatusChange={setStatus}
                    />
                </div>
                <main className="tasks-column">
                    <TaskCard
                        createdTask={createdTask}
                        search={search}
                        status={status}
                        onNotify={onNotify}
                    />
                </main>
            </div>
        </div>
    )
}

export default TaskList;