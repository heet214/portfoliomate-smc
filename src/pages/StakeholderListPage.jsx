import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const stakeholderData = [
    { title: 'Companies', count: 59, imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop', description: "All startups, Companies, Organizations will be here" },
    { title: 'Investors', count: 926, imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop', description: "All VCs, Angel Investors will be here" },
    { title: 'Individuals', count: 311, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop', description: "Individual stakeholders and contacts" },
    { title: 'Universities', count: 18, imageUrl: 'https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop', description: "Educational and research institutions" },
    { title: 'Operators', count: 115, imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', description: "Operators and service providers" },
  ];
  
  const generateCompanyData = (count) => {
      const data = [];
      const sectors = ['Food & Beverage', 'Food Delivery', 'Angel Investment', 'Android', 'Ad Exchange', '3D Technology', 'Sector Agnostic', 'AgTech', 'Property Development', 'Aerospace'];
      const locations = ['India', 'Cambodia', 'Vatican City', 'Åland Islands', 'Andorra', 'USA', 'Germany', 'Singapore'];
      const statuses = [{text: 'Profile Completed', bg: 'bg-green-100', text_color: 'text-green-700'}, {text: 'Profile Created', bg: 'bg-yellow-100', text_color: 'text-yellow-700'}];
      const names = ['Uber Eats', 'Baseline Test', 'Heet Test', 'abc', 'Mangopoint', 'ParkoBot', 'TEST COMPANY', 'Florintree Advisors', 'Innovate Inc.', 'Future Systems'];
  
      for (let i = 1; i <= count; i++) {
          const name = names[i % names.length];
          data.push({
              id: i,
              logo: `https://placehold.co/40x40/E2E8F0/4A5568?text=${name.charAt(0)}`,
              name: `${name} #${Math.floor(i / names.length) + 1}`,
              createdOn: new Date(2025, 7, 12 - (i % 30)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
              sector: sectors.slice(i % 5, (i % 5) + (i % 2 + 1)),
              location: locations[i % locations.length],
              status: statuses[i % statuses.length],
          });
      }
      return data;
  };
  
  export const companyListData = generateCompanyData(59);
  
// --- ICON COMPONENTS ---
const Search = ({size = 20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

function StakeholderListPage() {
    const { type } = useParams();
    const navigate = useNavigate(); // For navigation
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    const filteredData = useMemo(() => 
        companyListData.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sector.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, filteredData]);
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowClick = (item) => {
        navigate(`/stakeholders/${type}/${item.id}`);
    };

    return (
        <div className="bg-white h-full">
            {/* Controls Header */}
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200">
                <div className="relative flex-grow md:flex-grow-0 md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, sector..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-10 pl-9 pr-3 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-stretch gap-2">
                    <button className="h-10 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex-grow md:flex-grow-0">
                        <FilterIcon />
                        <span>Filters</span>
                    </button>
                    <button className="h-10 px-4 flex items-center justify-center gap-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex-grow md:flex-grow-0">
                        <ExportIcon />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="overflow-x-auto">
                {/* Desktop Table View */}
                <table className="hidden md:table w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4">Logo</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Created On</th>
                            <th scope="col" className="px-6 py-3">Sector</th>
                            <th scope="col" className="px-6 py-3">Location</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(item)}>
                                <td className="p-4"><img src={item.logo} alt={`${item.name} logo`} className="w-10 h-10 rounded-md object-cover" /></td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4">{item.createdOn}</td>
                                <td className="px-6 py-4">{item.sector.join(', ')}</td>
                                <td className="px-6 py-4">{item.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status.bg} ${item.status.text_color}`}>{item.status.text}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Mobile Card View */}
                <div className="md:hidden p-4 space-y-4">
                    {paginatedData.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 cursor-pointer" onClick={() => handleRowClick(item)}>
                            <div className="flex items-center gap-4">
                                <img src={item.logo} alt={`${item.name} logo`} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.location}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${item.status.bg} ${item.status.text_color}`}>{item.status.text}</span>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1 pl-14">
                                <p><span className="font-semibold">Created:</span> {item.createdOn}</p>
                                <p><span className="font-semibold">Sector:</span> {item.sector.join(', ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200">
                <span className="text-sm text-gray-700">
                    Showing <span className="font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-semibold">{filteredData.length}</span> results
                </span>
                <div className="inline-flex items-center -space-x-px">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StakeholderListPage;
