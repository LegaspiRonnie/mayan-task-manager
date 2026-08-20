const AlertMessage = ({ type = 'error', message, onClose }) => {
    if (!message) {
        return null;
    }

    const isSuccess = type === 'success';

    return (
        <div className={`alert alert-${isSuccess ? 'success' : 'danger'} d-flex justify-content-between align-items-center`} role="alert">
            <span>{message}</span>
            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close notification"
                ></button>
            )}
        </div>
    );
};

export default AlertMessage;