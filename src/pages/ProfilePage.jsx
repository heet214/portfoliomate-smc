import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { profileData } from '../data/data';
import ProfileOverview from '../components/ProfileOverview';
import ProfileDocuments from '../components/ProfileDocuments';

// --- ICONS ---
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;

const TABS = [
  { name: 'Overview', component: <ProfileOverview profile={profileData} /> },
  { name: 'Documents', component: <ProfileDocuments /> },
  { name: 'Funding', component: <div className="text-center text-gray-500 py-8">Funding information is locked.</div>, icon: <LockIcon /> },
  { name: 'Engagements', component: <div className="text-center text-gray-500 py-8">Engagements information is locked.</div>, icon: <LockIcon /> },
  { name: 'Logs', component: <div className="text-center text-gray-500 py-8">Logs are locked.</div>, icon: <LockIcon /> },
];

function ProfilePage() {
  const { id } = useParams(); // In a real app, you'd fetch data based on this ID
  const [activeTab, setActiveTab] = useState('Overview');
  const { user } = useAuth();
  const location = useLocation();

  // In a real app, profileData would be fetched based on the `id` param
  const profile = profileData;

  const canEdit = user && (user.userId === id || user.parentCompanyId === id);

  return (
    <div className="min-h-full">
      {/* Profile Header Section */}
      <div className="relative">
        {/* Gradient Banner */}
        <div className="h-32 md:h-40 bg-gradient-to-r from-purple-500 to-pink-500"></div>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            {/* Left side: Logo overlaps, Name is below */}
            <div className="flex items-end space-x-5">
              <div className="flex-shrink-0 -mt-16 sm:-mt-20">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-lg bg-white shadow-md border-4 border-white flex items-center justify-center">
                  <img src={profile.logo} alt={`${profile.name} Logo`} className="h-16 w-16" />
                </div>
              </div>
              <div className="pb-2 sm:pb-4 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">{profile.type}</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{profile.status}</span>
                </div>
              </div>
            </div>

            {/* Right side: Edit button aligns with name */}
            <div className="mt-4 sm:mt-0 sm:pb-4 flex-shrink-0 self-end">
              {/* {canEdit && ( // Conditionally render the edit button */}
                <Link
                  to={`${location.pathname}/edit`}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Edit Profile
                </Link>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation & Content */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === tab.name
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } ${!!tab.icon ? 'cursor-not-allowed text-gray-400' : ''}`}
                disabled={!!tab.icon}
              >
                {tab.icon && <span className="text-gray-400">{tab.icon}</span>}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="py-6">
          {TABS.find(tab => tab.name === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
