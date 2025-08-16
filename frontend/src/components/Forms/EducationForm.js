import React from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';

const EducationForm = ({ education, index, onChange, onRemove }) => {
    const handleChange = (field, value) => {
        onChange({
            ...education,
            [field]: value
        });
    };

    return (
        <div className="education-form">
            <div className="education-inputs">
                <div className="form-group">
                    <Input
                        type="text"
                        value={education.instituteName}
                        onChange={(e) => handleChange('instituteName', e.target.value)}
                        placeholder="School/College name"
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        value={education.courseName}
                        onChange={(e) => handleChange('courseName', e.target.value)}
                        placeholder="Course name"
                        maxLength={25}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        value={education.completedYear}
                        onChange={(e) => handleChange('completedYear', e.target.value)}
                        placeholder="MMM YYYY (e.g., Mar 2021)"
                        pattern="^[A-Za-z]{3} \d{4}$"
                    />
                </div>
                <Button type="button" variant="ghost" onClick={onRemove} className="btn-remove">
                    <i className="fas fa-times"></i>
                </Button>
            </div>
        </div>
    );
};

export default EducationForm;