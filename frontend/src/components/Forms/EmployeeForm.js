import React, { useState } from 'react';
import SkillForm from './SkillForm';
import EducationForm from './EducationForm';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Select from '../Common/Select';

const designationOptions = [
    { value: 'Developer', label: 'Developer' },
    { value: 'Manager', label: 'Manager' },
    { value: 'System Admin', label: 'System Admin' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'PM', label: 'PM' }
];

const EmployeeForm = ({ employee, index, onChange, onRemove }) => {
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        const updatedEmployee = {
            ...employee,
            [field]: value
        };
        onChange(updatedEmployee);

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSkillChange = (skillIndex, skillData) => {
        const updatedSkills = [...employee.skillInfo];
        updatedSkills[skillIndex] = skillData;
        handleInputChange('skillInfo', updatedSkills);
    };

    const addSkill = () => {
        const updatedSkills = [...employee.skillInfo, { skillName: '', skillRating: '' }];
        handleInputChange('skillInfo', updatedSkills);
    };

    const removeSkill = (skillIndex) => {
        const updatedSkills = employee.skillInfo.filter((_, i) => i !== skillIndex);
        handleInputChange('skillInfo', updatedSkills);
    };

    const handleEducationChange = (educationIndex, educationData) => {
        const updatedEducation = [...employee.educationInfo];
        updatedEducation[educationIndex] = educationData;
        handleInputChange('educationInfo', updatedEducation);
    };

    const addEducation = () => {
        const updatedEducation = [...employee.educationInfo, {
            instituteName: '',
            courseName: '',
            completedYear: ''
        }];
        handleInputChange('educationInfo', updatedEducation);
    };

    const removeEducation = (educationIndex) => {
        const updatedEducation = employee.educationInfo.filter((_, i) => i !== educationIndex);
        handleInputChange('educationInfo', updatedEducation);
    };

    return (
        <div className="employee-form">
            <div className="employee-header">
                <h4>Employee #{index + 1}</h4>
                <Button type="button" variant="ghost" onClick={onRemove} className="btn-delete-small">
                    <i className="fas fa-trash"></i>
                </Button>
            </div>

            {/* Employee Basic Info */}
            <div className="form-grid">
                <div className="form-group">
                    <label>Employee Name <span className="required">*</span></label>
                    <Input
                        type="text"
                        value={employee.empName}
                        onChange={(e) => handleInputChange('empName', e.target.value)}
                        placeholder="Enter employee name"
                        maxLength={25}
                        error={errors.empName}
                    />
                </div>

                <div className="form-group">
                    <label>Designation <span className="required">*</span></label>
                    <Select
                        value={employee.designation}
                        onChange={e => handleInputChange('designation', e.target.value)}
                        options={designationOptions}
                        placeholder="Select designation"
                        error={errors.designation}
                    />
                </div>

                <div className="form-group">
                    <label>Join Date <span className="required">*</span></label>
                    <Input
                        type="date"
                        value={employee.joinDate ? employee.joinDate.split('T')[0] : ''}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        error={errors.joinDate}
                    />
                </div>

                <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <Input
                        type="email"
                        value={employee.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="employee@company.com"
                        maxLength={100}
                        error={errors.email}
                    />
                </div>

                <div className="form-group full-width">
                    <label>Phone Number <span className="required">*</span></label>
                    <Input
                        type="text"
                        value={employee.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        maxLength={15}
                        error={errors.phoneNumber}
                    />
                </div>
            </div>

            {/* Skills Section */}
            <div className="subsection">
                <div className="subsection-header">
                    <h5>Skills</h5>
                    <Button type="button" onClick={addSkill} className="btn-primary-small">
                        <i className="fas fa-plus"></i>Add Skill
                    </Button>
                </div>

                {employee.skillInfo.length === 0 ? (
                    <div className="empty-subsection">No skills added yet.</div>
                ) : (
                    <div className="skills-list">
                        {employee.skillInfo.map((skill, skillIndex) => (
                            <SkillForm
                                key={skillIndex}
                                skill={skill}
                                index={skillIndex}
                                onChange={(skillData) => handleSkillChange(skillIndex, skillData)}
                                onRemove={() => removeSkill(skillIndex)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Education Section */}
            <div className="subsection">
                <div className="subsection-header">
                    <h5>Education</h5>
                    <Button type="button" onClick={addEducation} className="btn-primary-small">
                        <i className="fas fa-plus"></i>Add Education
                    </Button>
                </div>

                {employee.educationInfo.length === 0 ? (
                    <div className="empty-subsection">No education added yet.</div>
                ) : (
                    <div className="education-list">
                        {employee.educationInfo.map((education, educationIndex) => (
                            <EducationForm
                                key={educationIndex}
                                education={education}
                                index={educationIndex}
                                onChange={(educationData) => handleEducationChange(educationIndex, educationData)}
                                onRemove={() => removeEducation(educationIndex)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeForm;