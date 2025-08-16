export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
    return phone.length >= 10 && phone.length <= 15;
};

export const validateCompanyForm = (formData) => {
    const errors = {};

    if (!formData.companyName.trim()) {
        errors.companyName = 'Company name is required';
    } else if (formData.companyName.length > 50) {
        errors.companyName = 'Company name must be 50 characters or less';
    }

    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email';
    } else if (formData.email.length > 100) {
        errors.email = 'Email must be 100 characters or less';
    }

    if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be between 10-15 characters';
    }

    return errors;
};