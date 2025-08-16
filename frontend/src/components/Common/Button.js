import React from 'react';

const Button = ({ children, variant = 'default', className = '', disabled = false, ...props }) => {
    const baseClasses = 'btn';
    const variantClasses = {
        default: 'btn-default',
        primary: 'btn-primary',
        success: 'btn-success',
        outline: 'btn-outline',
        ghost: 'btn-ghost'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button className={classes} disabled={disabled} {...props}>
            {children}
        </button>
    );
};

export default Button;