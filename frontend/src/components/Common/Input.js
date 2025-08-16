import React from 'react';

const Input = ({ error, className = '', ...props }) => {
    const classes = `form-input ${error ? 'error' : ''} ${className}`;

    return (
        <div className="input-wrapper">
            <input className={classes} {...props} />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;