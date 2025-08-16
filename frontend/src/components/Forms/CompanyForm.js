import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { validateEmail, validatePhoneNumber, validateCompanyForm } from '../../utils/validation';

const CompanyForm = ({ initialData, onSubmit, isEdit, saving }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        email: '',
        phoneNumber: '',
        empInfo: []
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                companyName: initialData.companyName || '',
                address: initialData.address || '',
                email: initialData.email || '',
                phoneNumber: initialData.phoneNumber || '',
                empInfo: initialData.empInfo || []
            });
        }
    }, [initialData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleEmployeeChange = (index, employeeData) => {
        const updatedEmployees = [...formData.empInfo];
        updatedEmployees[index] = employeeData;
        setFormData(prev => ({
            ...prev,
            empInfo: updatedEmployees
        }));
    };

    const addEmployee = () => {
        setFormData(prev => ({
            ...prev,
            empInfo: [...prev.empInfo, {
                empName: '',
                designation: 'Developer',
                joinDate: '',
                email: '',
                phoneNumber: '',
                skillInfo: [],
                educationInfo: []
            }]
        }));
    };

    const removeEmployee = (index) => {
        setFormData(prev => ({
            ...prev,
            empInfo: prev.empInfo.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateCompanyForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData({
            companyName: '',
            address: '',
            email: '',
            phoneNumber: '',
            empInfo: []
        });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="company-form">
            {/* Company Basic Info */}
            <div className="form-section">
                <div className="section-header">
                    <h3><i className="fas fa-building"></i>Company Basic Information</h3>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Company Name <span className="required">*</span></label>
                        <Input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            placeholder="Enter company name"
                            maxLength={50}
                            error={errors.companyName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email <span className="required">*</span></label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="company@example.com"
                            maxLength={100}
                            error={errors.email}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number <span className="required">*</span></label>
                        <Input
                            type="text"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            maxLength={15}
                            error={errors.phoneNumber}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Company Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Enter company address"
                            rows={3}
                            className="form-textarea"
                        />
                    </div>
                </div>
            </div>

            {/* Employee Information */}
            <div className="form-section">
                <div className="section-header">
                    <h3><i className="fas fa-users"></i>Employee Information</h3>
                    <Button type="button" onClick={addEmployee} className="btn-success">
                        <i className="fas fa-plus"></i>Add Employee
                    </Button>
                </div>

                {formData.empInfo.length === 0 ? (
                    <div className="empty-state">
                        No employees added yet. Click "Add Employee" to get started.
                    </div>
                ) : (
                    <div className="employees-list">
                        {formData.empInfo.map((employee, index) => (
                            <EmployeeForm
                                key={index}
                                employee={employee}
                                index={index}
                                onChange={(employeeData) => handleEmployeeChange(index, employeeData)}
                                onRemove={() => removeEmployee(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
                <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                </Button>
                <Button type="submit" disabled={saving} className="btn-primary">
                    <i className="fas fa-save"></i>
                    {saving ? 'Saving...' : 'Save Company'}
                </Button>
            </div>
        </form>
    );
};

export default CompanyForm;