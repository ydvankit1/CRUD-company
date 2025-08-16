import React from 'react';
import Select from '../Common/Select';
import Button from '../Common/Button';

const skillOptions = [
    'Java', 'Angular', 'CSS', 'HTML', 'JavaScript', 'UI', 'SQL', 'React', 'PHP', 'GIT',
    'AWS', 'Python', 'Django', 'C', 'C++', 'C#', 'Unity', 'R', 'AI', 'NLP', 'Photoshop', 'Node.js'
].map(skill => ({ value: skill, label: skill }));

const ratingOptions = [
    { value: '1', label: '1 - Beginner' },
    { value: '2', label: '2 - Basic' },
    { value: '3', label: '3 - Intermediate' },
    { value: '4', label: '4 - Advanced' },
    { value: '5', label: '5 - Expert' }
];

const SkillForm = ({ skill, index, onChange, onRemove }) => {
    const handleChange = (field, value) => {
        onChange({
            ...skill,
            [field]: value
        });
    };

    return (
        <div className="skill-form">
            <div className="skill-inputs">
                <div className="form-group">
                    <Select
                        value={skill.skillName}
                        onChange={e => handleChange('skillName', e.target.value)}
                        options={skillOptions}
                        placeholder="Select skill"
                    />
                </div>
                <div className="form-group">
                    <Select
                        value={skill.skillRating}
                        onChange={e => handleChange('skillRating', e.target.value)}
                        options={ratingOptions}
                        placeholder="Select rating"
                    />
                </div>
                <Button type="button" variant="ghost" onClick={onRemove} className="btn-remove">
                    <i className="fas fa-times"></i>
                </Button>
            </div>
        </div>
    );
};

export default SkillForm;