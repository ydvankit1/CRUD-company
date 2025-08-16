const Company = require('../models/Company');
const { validationResult } = require('express-validator');

// Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Failed to fetch companies' });
    }
};

// Get company by ID
const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ message: 'Failed to fetch company' });
    }
};

// Create new company
const createCompany = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const company = new Company(req.body);
        const savedCompany = await company.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Failed to create company' });
    }
};

// Update company
const updateCompany = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json(company);
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ message: 'Failed to update company' });
    }
};

// Delete company
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ message: 'Failed to delete company' });
    }
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};