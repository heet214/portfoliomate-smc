import React from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';

export const stakeholderData = [
    { title: 'Companies', count: 59, imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop', description: "All startups, Companies, Organizations will be here" },
    { title: 'Investors', count: 926, imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop', description: "All VCs, Angel Investors will be here" },
    { title: 'Individuals', count: 311, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop', description: "Individual stakeholders and contacts" },
    { title: 'Universities', count: 18, imageUrl: 'https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop', description: "Educational and research institutions" },
    { title: 'Operators', count: 115, imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', description: "Operators and service providers" },
  ];
  

// --- ICON COMPONENTS ---
const ChevronRight = ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;

function Header({ setMobileOpen }) {
    const location = useLocation();
    // Check if the current route matches the stakeholder list page pattern
    const listPageMatch = useMatch('/stakeholders/:type');

    // This function generates breadcrumbs for non-list pages
    const getBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        if (pathnames.length === 0) return [{ name: 'Stakeholders', path: '/' }];
        
        const name = pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1);
        return [{ name: name, path: `/${pathnames[0]}` }];
    }
    
    const breadcrumbs = getBreadcrumbs();

    // Find stakeholder info for the dynamic header title
    const stakeholderInfo = listPageMatch 
        ? stakeholderData.find(s => s.title.toLowerCase() === listPageMatch.params.type) 
        : null;

    return (
        <header className="flex-shrink-0 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <button onClick={() => setMobileOpen(true)} className="text-gray-500 md:hidden mr-4">
                        <MenuIcon />
                    </button>
                    
                    {/* Conditional Header Content */}
                    {listPageMatch ? (
                        // Header for the Stakeholder List Page
                        <div className="flex items-center gap-3">
                            <Link to="/" className="text-gray-500 hover:text-gray-800 p-1.5 rounded-md hover:bg-gray-100">
                                <ArrowLeft />
                            </Link>
                            <h1 className="text-xl font-bold text-gray-900">
                                {stakeholderInfo ? `${stakeholderInfo.title} (${stakeholderInfo.count})` : 'Stakeholders'}
                            </h1>
                        </div>
                    ) : (
                        // Default Breadcrumb Header
                        <div className="hidden md:flex items-center text-sm text-gray-500">
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <ChevronRight />}
                                    <Link to={crumb.path} className={`px-2 py-1 rounded-md font-semibold text-gray-800`}>
                                        {crumb.name}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <button className="flex items-center justify-center bg-[#312E81] hover:bg-indigo-700 text-white font-semibold px-4 h-10 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <PlusIcon />
                        <span className="ml-2 hidden sm:inline">New Stakeholder</span>
                    </button>
                    <div className="flex items-center space-x-3">
                        <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" 
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="hidden sm:block">
                            <div className="font-semibold text-gray-800 text-sm">Shehal Shah</div>
                            <div className="text-xs text-gray-500">Assistant to the General Supreme Intern</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
