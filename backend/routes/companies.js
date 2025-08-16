const express = require('express');
const { body } = require('express-validator');
const {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
} = require('../controllers/companyController');

const router = express.Router();

// Validation rules
const companyValidation = [
    body('companyName').notEmpty().withMessage('Company name is required').isLength({ max: 50 }),
    body('email').isEmail().withMessage('Please enter a valid email').isLength({ max: 100 }),
    body('phoneNumber').notEmpty().withMessage('Phone number is required').isLength({ max: 15 }),
    body('empInfo.*.empName').optional().isLength({ max: 25 }),
    body('empInfo.*.designation').optional().isIn(['Developer', 'Manager', 'System Admin', 'Team Lead', 'PM']),
    body('empInfo.*.email').optional().isEmail().isLength({ max: 100 }),
    body('empInfo.*.phoneNumber').optional().isLength({ max: 15 })
];

// Routes
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', companyValidation, createCompany);
router.put('/:id', companyValidation, updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;