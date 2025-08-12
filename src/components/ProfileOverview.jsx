import React from 'react';

const InfoCard = ({ label, value, children }) => (
  <div className="bg-gray-50 border border-gray-200/80 rounded-lg p-4">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    {children ? children : <p className="text-sm font-semibold text-gray-800">{value || <span className="text-gray-400 font-normal">Not provided</span>}</p>}
  </div>
);

const AssociatedMemberCard = () => (
    <div className="flex items-center gap-3">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" alt="Sanchit Tripathi" className="w-10 h-10 rounded-full"/>
        <div>
            <p className="font-semibold text-sm text-gray-800">Sanchit Tripathi</p>
            <p className="text-xs text-gray-500">Member</p>
        </div>
    </div>
);

function ProfileOverview({ profile }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <InfoCard label="About">
            <p className="text-sm text-gray-600">{profile.about}</p>
        </InfoCard>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard label="Company Registered Name" value={profile.registeredName} />
            <InfoCard label="Brand Name" value={profile.brandName} />
            <InfoCard label="CIN" value={profile.cin} />
            <InfoCard label="Address" value={profile.address} />
            <InfoCard label="Pincode" value={profile.pincode} />
            <InfoCard label="Incorporated At" value={profile.incorporatedAt} />
            <InfoCard label="Company Website / URL">
                <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 hover:underline">{profile.website}</a>
            </InfoCard>
            <InfoCard label="Sectors">
                <div className="flex flex-wrap gap-2">
                    {profile.sectors.map(sector => (
                        <span key={sector} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{sector}</span>
                    ))}
                </div>
            </InfoCard>
            <InfoCard label="Social Media" value={profile.socialMedia} />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Associated Members</h3>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">+ Add Member</button>
              </div>
              <AssociatedMemberCard />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Referred By</h3>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">+ Add Reference</button>
              </div>
              <div className="text-center text-gray-400 text-sm py-4">No reference added</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Incubated At</h3>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">+ Add Incubator</button>
              </div>
              <div className="text-center text-gray-400 text-sm py-4">No incubator added</div>
          </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
