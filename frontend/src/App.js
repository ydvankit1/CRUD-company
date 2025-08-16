import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import CompanyList from './pages/CompanyList';
import CompanyFormPage from './pages/CompanyFormPage';
import './styles.css';

function App() {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<CompanyList />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/companies/new" element={<CompanyFormPage />} />
                    <Route path="/companies/edit/:id" element={<CompanyFormPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;