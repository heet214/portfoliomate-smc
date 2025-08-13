import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { companyListData } from "../data/data";

// --- ICON COMPONENTS ---
const ChevronRight = ({ size = 16 }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		<path d="m9 18 6-6-6-6" />
	</svg>
);
const MenuIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="4" x2="20" y1="12" y2="12" />
		<line x1="4" x2="20" y1="6" y2="6" />
		<line x1="4" x2="20" y1="18" y2="18" />
	</svg>
);
const ArrowLeft = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M19 12H5" />
		<path d="m12 19-7-7 7-7" />
	</svg>
);

function Header({ setMobileOpen }) {
	const location = useLocation();
	const profileMatch = useMatch("/stakeholders/:type/:id");

	const getBreadcrumbs = () => {
		const pathnames = location.pathname.split("/").filter(x => x);
		let breadcrumbs = [];

		// Home / Stakeholder Dashboard
		if (pathnames.length === 0) {
			breadcrumbs.push({ name: "Stakeholders", path: "/stakeholders" });
			return breadcrumbs;
		}

		// Stakeholder List or Profile Page
		if (pathnames[0] === "stakeholders") {
			breadcrumbs.push({ name: "Stakeholders", path: "/stakeholders" });

			if (pathnames[1]) {
				const typeName = pathnames[1].charAt(0).toUpperCase() + pathnames[1].slice(1);
				breadcrumbs.push({ name: typeName, path: `/stakeholders/${pathnames[1]}` });
			}

			if (pathnames[2] && profileMatch) {
				const company = companyListData.find(c => c.id.toString() === pathnames[2]);
				if (company) {
					breadcrumbs.push({ name: company.name, path: location.pathname });
				}
			}
			return breadcrumbs;
		}

		// Other top-level pages
		const name = pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1);
		breadcrumbs.push({ name: name, path: `/${pathnames[0]}` });
		return breadcrumbs;
	};

	const breadcrumbs = getBreadcrumbs();

	return (
		<header className="flex-shrink-0 bg-white border-b border-gray-200">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center">
					<button onClick={() => setMobileOpen(true)} className="text-gray-500 md:hidden mr-4">
						<MenuIcon />
					</button>

					<div className="hidden md:flex items-center text-sm text-gray-500">
						{breadcrumbs.map((crumb, index) => (
							<React.Fragment key={index}>
								{index > 0 && <ChevronRight />}
								<Link to={crumb.path} className={`px-2 py-1 rounded-md hover:bg-gray-100 hover:text-gray-700 ${index === breadcrumbs.length - 1 ? "font-semibold text-gray-800" : ""}`}>
									{crumb.name}
								</Link>
							</React.Fragment>
						))}
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-3">
						<img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
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
