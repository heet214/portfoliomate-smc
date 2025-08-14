import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createAnnouncement } from '../apis';
import { uploadFileToStorage } from '../utils/storage';

const CATEGORIES = [
  { name: 'Event Update', bg: 'bg-blue-100', text: 'text-blue-800', selected: 'bg-blue-600 text-white' },
  { name: 'Important', bg: 'bg-red-100', text: 'text-red-800', selected: 'bg-red-600 text-white' },
  { name: 'Logistics', bg: 'bg-yellow-100', text: 'text-yellow-800', selected: 'bg-yellow-500 text-white' },
  { name: 'Workshop', bg: 'bg-green-100', text: 'text-green-800', selected: 'bg-green-600 text-white' },
];

function CreateAnnouncementModal({ isOpen, onClose, onNewAnnouncement }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageFile, setImageFile] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadFileToStorage(imageFile, 'announcementImages');
      }
      const newPostData = await createAnnouncement({
        title, content, category: category.name, categoryColor: category.selected, imageUrl, isPinned
      });
      onNewAnnouncement(newPostData);
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setCategory(CATEGORIES[0]);
    setImageFile(null);
    setIsPinned(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Create Announcement</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-5 space-y-5">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=312E81&color=fff`} 
                alt="admin avatar" className="w-11 h-11 rounded-full" />
              <div>
                <p className="font-medium text-gray-800">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-lg font-semibold border-b border-gray-300 focus:border-[#312E81] outline-none pb-1"
            />

            {/* Content */}
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#312E81] focus:ring-1 focus:ring-[#312E81] resize-none"
              rows="5"
              placeholder="What's on your mind?"
            ></textarea>

            {/* Categories */}
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      category.name === cat.name ? cat.selected : `${cat.bg} ${cat.text} hover:opacity-80`
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pin & Image */}
            <div className="flex items-center justify-between">
              <label htmlFor="pin-post" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  id="pin-post"
                  checked={isPinned}
                  onChange={e => setIsPinned(e.target.checked)}
                  className="h-4 w-4 text-[#312E81] border-gray-300 rounded focus:ring-[#312E81]"
                />
                Pin this post
              </label>
              <label htmlFor="image-upload" className="flex items-center gap-2 text-sm font-medium text-[#312E81] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                  fill="none" stroke="currentColor" strokeWidth="2" 
                  strokeLinecap="round" strokeLinejoin="round"
                ><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Add Image
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setImageFile(e.target.files[0])}
                />
              </label>
            </div>
            {imageFile && <p className="text-sm text-green-600">Selected: {imageFile.name}</p>}
          </div>
        </form>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          {error && <p className="text-sm text-red-600 mb-3 text-center">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#312E81] text-white font-medium px-4 py-3 rounded-lg hover:bg-[#282569] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Post Announcement'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAnnouncementModal;
