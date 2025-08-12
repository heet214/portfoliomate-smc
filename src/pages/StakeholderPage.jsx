import React from 'react';
import StakeholderCard from '../components/StakeholderCard';

const stakeholderData = [
  { title: 'Companies', count: 115, imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop' },
  { title: 'Investors', count: 926, imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Individuals', count: 311, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop' }, 
  { title: 'Universities', count: 18, imageUrl: 'https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Operators', count: 115, imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop' },
];

function StakeholderPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Stakeholder Management</h1>
      <p className="mt-1 text-sm text-gray-600">
        Set up a new fundraising engagement with all the necessary details and documentation.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stakeholderData.map((stakeholder, index) => (
          <StakeholderCard 
            key={index} 
            title={stakeholder.title}
            count={stakeholder.count}
            imageUrl={stakeholder.imageUrl}
            description="All startups, Companies, Organizations will be here"
          />
        ))}
      </div>
    </div>
  );
}

export default StakeholderPage;