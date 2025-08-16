import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { companiesApi } from '../services/api';
import CompanyForm from '../components/Forms/CompanyForm';
import Button from '../components/Common/Button';
import Alert from '../components/Common/Alert';

const CompanyFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        if (isEdit) {
            fetchCompany();
        }
    }, [id, isEdit]);

    const fetchCompany = async () => {
        try {
            const response = await companiesApi.getById(id);
            setCompany(response.data);
        } catch (error) {
            showAlert('Failed to fetch company data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        setSaving(true);
        try {
            if (isEdit) {
                await companiesApi.update(id, formData);
                showAlert('Company details updated successfully', 'success');
            } else {
                await companiesApi.create(formData);
                showAlert('Company details saved successfully', 'success');
            }
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            showAlert(`Failed to ${isEdit ? 'update' : 'save'} company`, 'error');
        } finally {
            setSaving(false);
        }
    };

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    if (isEdit && loading) {
        return (
            <div className="page">
                <div className="page-header">
                    <h2>Loading...</h2>
                </div>
                <div className="loading">Loading company data...</div>
            </div>
        );
    }

    return (
        <div className="page">
            {alert.show && (
                <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ show: false, message: '', type: '' })} />
            )}

            <div className="page-header">
                <div className="header-content">
                    <div>
                        <h2>{isEdit ? 'Edit Company' : 'New Company'}</h2>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/')}>
                        <i className="fas fa-arrow-left"></i>Back to List
                    </Button>
                </div>
            </div>

            <div className="page-content">
                <CompanyForm
                    initialData={company}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                    saving={saving}
                />
            </div>
        </div>
    );
};

export default CompanyFormPage;