import React from 'react';
import { Link } from 'react-router-dom';

const ArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

function StakeholderCard({ title, count, description, imageUrl }) {
  return (
    <Link to={`/stakeholders/${title.toLowerCase()}`} className="block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-36 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-700 group-hover:bg-white transition-colors">
          <ArrowRight />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>
    </Link>
  );
}

export default StakeholderCard;
