import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const companiesApi = {
    getAll: () => api.get('/companies'),
    getById: (id) => api.get(`/companies/${id}`),
    create: (company) => api.post('/companies', company),
    update: (id, company) => api.put(`/companies/${id}`, company),
    delete: (id) => api.delete(`/companies/${id}`)
};

export default api;