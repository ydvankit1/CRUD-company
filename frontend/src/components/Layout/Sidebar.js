import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        {
            href: '/',
            label: 'Company List',
            icon: 'fas fa-list',
            active: location.pathname === '/' || location.pathname === '/companies',
        },
        {
            href: '/companies/new',
            label: 'New Company',
            icon: 'fas fa-plus',
            active: location.pathname === '/companies/new' || location.pathname.startsWith('/companies/edit'),
        },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">
                    <i className="fas fa-building"></i>
                    CRUD Application
                </h1>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={`nav-link ${item.active ? 'active' : ''}`}
                    >
                        <i className={item.icon}></i>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;