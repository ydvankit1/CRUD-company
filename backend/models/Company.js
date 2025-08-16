const mongoose = require('mongoose');

// Skill Schema
const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true,
        enum: ['Java', 'Angular', 'CSS', 'HTML', 'JavaScript', 'UI', 'SQL', 'React', 'PHP', 'GIT', 'AWS', 'Python', 'Django', 'C', 'C++', 'C#', 'Unity', 'R', 'AI', 'NLP', 'Photoshop', 'Node.js']
    },
    skillRating: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5']
    }
});

// Education Schema
const educationSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
        maxlength: 50
    },
    courseName: {
        type: String,
        required: true,
        maxlength: 25
    },
    completedYear: {
        type: String,
        required: true,
        match: /^[A-Za-z]{3} \d{4}$/
    }
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
    empName: {
        type: String,
        required: true,
        maxlength: 25
    },
    designation: {
        type: String,
        required: true,
        enum: ['Developer', 'Manager', 'System Admin', 'Team Lead', 'PM']
    },
    joinDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (date) {
                return date <= new Date();
            },
            message: 'Join date cannot be in the future'
        }
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phoneNumber: {
        type: String,
        required: true,
        maxlength: 15
    },
    skillInfo: [skillSchema],
    educationInfo: [educationSchema]
});

// Company Schema
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        maxlength: 50
    },
    address: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phoneNumber: {
        type: String,
        required: true,
        maxlength: 15
    },
    empInfo: [employeeSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);