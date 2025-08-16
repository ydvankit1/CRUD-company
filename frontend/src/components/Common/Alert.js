import React from 'react';

const Alert = ({ type, message, onClose }) => {
    const alertClasses = {
        success: 'alert-success',
        error: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info'
    };

    const iconClasses = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    return (
        <div className={`alert ${alertClasses[type]}`}>
            <div className="alert-content">
                <i className={iconClasses[type]}></i>
                <span>{message}</span>
            </div>
            {onClose && (
                <button className="alert-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            )}
        </div>
    );
};

export default Alert;