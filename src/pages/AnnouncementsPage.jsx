import React, { useState, useMemo, useEffect } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import CreateAnnouncementModal from "../components/CreateAnnouncementModal";
import { useAuth } from "../context/AuthContext";
import { getAnnouncements } from "../apis";

const SearchIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const AnnouncementsPage = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError("Failed to load announcements.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const categories = ["All", ...new Set(announcements.map(item => item.category))];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(announcement => {
      const matchesCategory = activeFilter === "All" || announcement.category === activeFilter;
      const matchesSearch = searchTerm === "" || announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeFilter, announcements]);

  return (
    <>
      <CreateAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNewAnnouncement={(newPost) => setAnnouncements(prev => [newPost, ...prev])}
      />
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Announcements</h1>
          <p className="text-gray-500 mt-1">Latest news, events, and important information.</p>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            {user?.role === 'admin' && (
              <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                <div className="flex items-center space-x-4">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=312E81&color=fff`} 
                    alt="admin avatar" className="w-10 h-10 rounded-full" />
                  <button onClick={() => setIsModalOpen(true)} 
                    className="w-full text-left p-2 text-gray-500 rounded-lg hover:bg-gray-100">
                    Create a new announcement...
                  </button>
                </div>
              </div>
            )}
            <div className="bg-white p-4 rounded-xl shadow-md mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#312E81] focus:border-[#312E81]"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map(category => (
                  <button key={category} onClick={() => setActiveFilter(category)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      activeFilter === category
                        ? "bg-[#312E81] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {loading && <p className="text-center py-10 text-gray-500">Loading announcements...</p>}
              {error && <p className="text-center py-10 text-red-500">{error}</p>}
              {!loading && !error && (
                filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map(announcement => <AnnouncementCard key={announcement.id} announcement={announcement} />)
                ) : (
                  <div className="text-center py-10 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500">No announcements found.</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Trending Topics</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-[#312E81] hover:underline">#KeynoteSpeakers</a></li>
                  <li><a href="#" className="text-sm text-[#312E81] hover:underline">#NetworkingDinner</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementsPage;
