import React, { useState, useMemo } from 'react';
import { documentData } from '../data/data';

// --- ICONS ---
const DocIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const FolderIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;

const DocumentCard = ({ doc }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center group relative hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div className="absolute top-2 right-2">
            {doc.isPrivate && <span className="text-gray-400" title="Private document"><LockIcon /></span>}
        </div>
        <DocIcon />
        <p className="text-sm font-semibold text-gray-800 mt-2 truncate px-2">{doc.name}</p>
        <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
    </div>
);

const CategoryButton = ({ icon, title, count, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-100'}`}
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-semibold text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className={`text-sm ${active ? 'text-indigo-700' : 'text-gray-500'}`}>{count}</span>
            <ChevronRight />
        </div>
    </button>
);

function ProfileDocuments() {
    const [activeCategory, setActiveCategory] = useState('Company Documents');

    const categories = useMemo(() => {
        const counts = documentData.reduce((acc, doc) => {
            acc[doc.category] = (acc[doc.category] || 0) + 1;
            return acc;
        }, {});
        return [
            { name: 'Company Documents', count: counts['Company Documents'] || 0 },
            { name: 'Mandates', count: counts['Mandates'] || 0 },
            { name: 'Engagement Process', count: counts['Engagement Process'] || 0 },
            { name: 'Other Documents', count: counts['Other Documents'] || 0 },
        ];
    }, []);

    const filteredDocs = useMemo(() => 
        documentData.filter(doc => doc.category === activeCategory),
    [activeCategory]);

    return (
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Documents</h2>
                    <p className="text-sm text-gray-600 mt-1">All your company, mandate, and engagement documents in one place.</p>
                </div>
                <button className="flex-shrink-0 flex items-center gap-2 bg-[#312E81] text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
                    <UploadIcon />
                    Upload Document
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Categories */}
                <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-3 space-y-1 self-start">
                     {categories.map(cat => (
                         <CategoryButton 
                            key={cat.name}
                            icon={<FolderIcon className={activeCategory === cat.name ? "text-indigo-600" : "text-gray-400"}/>} 
                            title={cat.name} 
                            count={cat.count} 
                            active={activeCategory === cat.name} 
                            onClick={() => setActiveCategory(cat.name)} 
                        />
                     ))}
                </div>

                {/* Right Column: Documents */}
                <div className="lg:col-span-2">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg p-3 flex items-start gap-3 mb-4">
                        <InfoIcon className="flex-shrink-0 mt-0.5"/>
                        <div>
                            <strong>Public documents</strong> are visible to investors. <strong>Private documents</strong> are only visible to your team. You can change a document's visibility at any time by clicking the lock icon.
                        </div>
                    </div>
                    {filteredDocs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredDocs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-16 border-2 border-dashed border-gray-200 rounded-lg">
                            <p>No documents in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileDocuments;
