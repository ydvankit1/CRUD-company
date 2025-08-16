import React from 'react';

const Select = ({ options, error, className = '', placeholder, ...props }) => {
    const classes = `form-select ${error ? 'error' : ''} ${className}`;

    return (
        <div className="select-wrapper">
            <select className={classes} {...props}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Select;