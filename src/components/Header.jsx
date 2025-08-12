import React from 'react';

const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

function Header({ setMobileOpen }) {
  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
            <button onClick={() => setMobileOpen(true)} className="text-gray-500 md:hidden mr-4">
                <MenuIcon />
            </button>
            <div className="hidden md:flex items-center text-sm text-gray-500">
                <span className="hover:text-gray-700 cursor-pointer">Engagement</span>
                <ChevronRight />
                <span className="font-semibold text-gray-800">Stakeholder Management</span>
            </div>
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
                    <div className="font-semibold text-gray-800 text-sm">Deepak Krishna K</div>
                    <div className="text-xs text-gray-500">UX/UI Designer</div>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}

export default Header;