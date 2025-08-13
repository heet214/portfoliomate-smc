import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" y1="8" x2="22" y2="14"/><line x1="19" y1="11" x2="25" y2="11"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;

const SettingsItem = ({ icon, title, description, to }) => (
    <Link to={to} className="flex items-center p-4 sm:p-6 hover:bg-gray-50 transition-colors">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-[#312E81] flex items-center justify-center">
            {icon}
        </div>
        <div className="flex-grow ml-4">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="text-gray-400">
            <ChevronRightIcon />
        </div>
    </Link>
);

function SettingsDashboard() {
    const { user } = useAuth();

    return (
        <div className="">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Account</h2>
                    <p className="text-sm text-gray-500 mt-1">{user?.email || 'N/A'}</p>
                </div>
                <div className="divide-y divide-gray-200">
                    <SettingsItem 
                        icon={<UserPlusIcon />}
                        title="Add Employee" 
                        description="Create a new login account for a team member." 
                        to="/settings/add-employee" 
                    />
                    <SettingsItem 
                        icon={<UsersIcon />}
                        title="View Employees" 
                        description="View and manage all employee accounts." 
                        to="/settings/view-employees" 
                    />
                    <SettingsItem 
                        icon={<KeyIcon />}
                        title="Reset Password" 
                        description="Change the password for your account." 
                        to="#" 
                    />
                </div>
            </div>
        </div>
    );
}

export default SettingsDashboard;
