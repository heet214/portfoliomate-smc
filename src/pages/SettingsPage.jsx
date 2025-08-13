import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsDashboard from '../components/SettingsDashboard';
import AddEmployeePage from '../components/AddEmployeePage';
import ViewEmployeesPage from '../components/ViewEmployeesPage';

function SettingsPage() {
    return (
        <Routes>
            <Route index element={<SettingsDashboard />} />
            <Route path="add-employee" element={<AddEmployeePage />} />
            <Route path="view-employees" element={<ViewEmployeesPage />} />
        </Routes>
    );
}

export default SettingsPage;
