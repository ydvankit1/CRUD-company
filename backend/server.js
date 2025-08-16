const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const companyRoutes = require('./routes/companies');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/companymanagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/companies', companyRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Company Management API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
