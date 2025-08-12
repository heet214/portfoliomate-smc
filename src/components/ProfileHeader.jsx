import React from 'react';

function ProfileHeader() {
  return (
    <div className="relative mb-6">
      {/* Banner Image */}
      <div className="h-32 md:h-48 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2155&auto=format&fit=crop" 
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 transform translate-y-1/2">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg bg-white shadow-md border-4 border-white flex items-center justify-center">
                   <img 
                      src="https://raw.githubusercontent.com/user-attachments/assets/c3976c59-3965-4654-814a-e782a20235a9/PortfoliomateLogosidebar.svg"
                      alt="Tomo Corp Logo" 
                      className="h-16 w-16"
                   />
                </div>
              </div>
            </div>
            <div className="pb-2 sm:pb-4">
              <h1 className="text-2xl font-bold text-gray-900">Tomo Corp</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">Startup</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Profile Completed</span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:pb-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {/* Spacer to push content below the transformed profile info */}
      <div className="h-16 sm:h-20"></div>
    </div>
  );
}

export default ProfileHeader;
