import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companiesApi } from '../services/api';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Alert from '../components/Common/Alert';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await companiesApi.getAll();
            setCompanies(response.data);
        } catch (error) {
            showAlert('Failed to fetch companies', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, companyName) => {
        if (window.confirm(`Are you sure you want to delete ${companyName}? This action cannot be undone.`)) {
            try {
                await companiesApi.delete(id);
                setCompanies(companies.filter(company => company._id !== id));
                showAlert('Company deleted successfully', 'success');
            } catch (error) {
                showAlert('Failed to delete company', 'error');
            }
        }
    };

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // ...existing code...

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getCompanyInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (loading) {
        return (
            <div className="page">
                <div className="page-header">
                    <h2>Company List</h2>
                </div>
                <div className="loading">Loading companies...</div>
            </div>
        );
    }

    return (
        <div className="page">
            {alert.show && (
                <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ show: false, message: '', type: '' })} />
            )}

            <div className="page-header">
                <h2>Company List</h2>
            </div>

            <div className="page-content">
                <div className="page-controls">
                    <Link to="/companies/new">
                        <Button className="btn-primary">
                            <i className="fas fa-plus"></i>Add Company
                        </Button>
                    </Link>
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        No companies added yet.
                                    </td>
                                </tr>
                            ) : (
                                companies.map((company) => (
                                    <tr key={company._id}>
                                        <td>
                                            <div className="company-info">
                                                <div className="company-avatar">
                                                    {getCompanyInitials(company.companyName)}
                                                </div>
                                                <div>
                                                    <div className="company-name">{company.companyName}</div>
                                                    <div className="company-employees">
                                                        {company.empInfo.length} employee{company.empInfo.length !== 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{company.email}</td>
                                        <td>{company.phoneNumber}</td>
                                        <td>{formatDate(company.createdAt)}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <Link to={`/companies/edit/${company._id}`}>
                                                    <button className="btn-action btn-edit">
                                                        <i className="fas fa-edit"></i> Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className="btn-action btn-delete"
                                                    onClick={() => handleDelete(company._id, company.companyName)}
                                                >
                                                    <i className="fas fa-trash"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {companies.length > 0 && (
                    <div className="table-footer">
                        Showing {companies.length} companies
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyList;