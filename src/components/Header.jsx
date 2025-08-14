import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ChevronRight = ({ size = 16 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="4"></line><line x1="15" y1="22" x2="15" y2="4"></line><line x1="2" y1="10" x2="22" y2="10"></line></svg>;

function Header({ setMobileOpen }) {
    const location = useLocation();
    const { user, logout } = useAuth();

    const getBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter(x => x);
        let breadcrumbs = [];

        if (pathnames.length === 0) {
            breadcrumbs.push({ name: 'Stakeholders', path: '/stakeholders' });
            return breadcrumbs;
        }

        // Handle settings pages
        if (pathnames[0] === 'settings') {
            breadcrumbs.push({ name: 'Settings', path: '/settings' });
            if (pathnames[1] === 'add-employee') {
                breadcrumbs.push({ name: 'Add Employee', path: '/settings/add-employee' });
            }
            if (pathnames[1] === 'view-employees') {
                breadcrumbs.push({ name: 'View Employees', path: '/settings/view-employees' });
            }
            return breadcrumbs;
        }

        // Handle stakeholder pages
        if (pathnames[0] === 'stakeholders') {
            breadcrumbs.push({ name: 'Stakeholders', path: '/stakeholders' });
            if (pathnames[1]) { const typeName = pathnames[1].charAt(0).toUpperCase() + pathnames[1].slice(1); breadcrumbs.push({ name: typeName, path: `/stakeholders/${pathnames[1]}` }); }
            if (pathnames[2]) { breadcrumbs.push({ name: 'Profile', path: location.pathname }); }
            return breadcrumbs;
        }

        const name = pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1);
        breadcrumbs.push({ name: name, path: `/${pathnames[0]}` });
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <header className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center px-4 py-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-gray-500 md:hidden mr-4"
            >
              <MenuIcon />
            </button>
            <div className="hidden md:flex items-center text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight />}
                  <Link
                    to={crumb.path}
                    className={`px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-700 ${
                      index === breadcrumbs.length - 1
                        ? "font-semibold text-gray-800"
                        : ""
                    }`}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
      
          {/* Right section */}
          <div className="flex items-center space-x-4  py-4">
            {user && (
              <>
                {/* <button className="flex items-center justify-center bg-[#312E81] hover:bg-indigo-800 text-white font-semibold px-4 h-10 rounded-md text-sm">
                  <PlusIcon />
                  <span className="ml-2 hidden sm:inline">New Stakeholder</span>
                </button> */}
                <div className="relative group px-4">
                  <button className="flex items-center space-x-3">
                    <img
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${user.displayName}&background=312E81&color=fff`
                      }
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="hidden sm:block text-left">
                      <div className="font-semibold text-gray-800 text-sm">
                        {user.displayName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user?.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </div>
                    </div>
                  </button>
      
                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to={`/profile/${user.userId}`}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserIcon />
                        <span className="ml-2">My Profile</span>
                      </Link>
                      {user.parentCompanyId && (
                        <Link
                          to={`/profile/${user.parentCompanyId}`}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BuildingIcon />
                          <span className="ml-2">My Organization</span>
                        </Link>
                      )}
                    </div>
                    <div className="py-1 border-t border-gray-200">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      
    );
}

export default Header;
