const TaskFilter = ({ search, status, onSearchChange, onStatusChange }) => {
    return (
        <div className="task-filter">
            <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
                <div className="col-12">
                    <label className="visually-hidden" htmlFor="taskSearch">Search tasks</label>
                    <input
                        type="search"
                        className="form-control"
                        id="taskSearch"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                </div>
            </form>
            
            <div className="d-lg-none">
                <button
                    className="btn btn-outline-primary w-100 d-flex justify-content-between align-items-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filtersPanel"
                    aria-expanded="false"
                    aria-controls="filtersPanel"
                >
                    <span><i className="bi bi-funnel me-2"></i>Filters</span>
                    <i className="bi bi-chevron-down"></i>
                </button>
            </div>

            <div id="filtersPanel" className="collapse d-lg-block">
                <div className="border rounded p-3 bg-light mt-3 mt-lg-0">
                    <h2 className="h6 mb-3">Filters</h2>
                    <label className="form-label" htmlFor="taskStatus">
                        Status
                    </label>
                    <select
                        className="form-select"
                        id="taskStatus"
                        value={status}
                        onChange={(event) => onStatusChange(event.target.value)}
                    >
                        <option value="all">All tasks</option>
                        <option value="incomplete">Incomplete</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default TaskFilter;