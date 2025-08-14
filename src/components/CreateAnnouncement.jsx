import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createAnnouncement } from '../apis';
import { uploadFileToStorage } from '../utils/storage';

// Inlined SVG Icons for simplicity
const PlusIcon = props => <svg {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const ImageIcon = props => <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

function CreateAnnouncement({ onNewAnnouncement }) {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (user?.role !== 'admin') {
        return null; // Don't render this component for non-admins
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError('Content cannot be empty.');
            return;
        }
        setIsSubmitting(true);
        setError('');

        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadFileToStorage(imageFile, 'announcementImages');
            }
            
            // For this version, we'll use a simple title and category
            const announcementData = {
                title: content.split('\n')[0].substring(0, 50), // Use first line as title
                content,
                imageUrl,
                category: "General", // Default category
                isPinned: false,
            };

            const newPost = await createAnnouncement(announcementData);
            onNewAnnouncement(newPost); // Callback to update parent state
            setContent('');
            setImageFile(null);

        } catch (err) {
            setError(err.message || 'Failed to create announcement.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <form onSubmit={handleSubmit}>
                <div className="flex items-start space-x-4">
                    <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=312E81&color=fff`} alt="admin avatar" className="w-10 h-10 rounded-full" />
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border-none focus:ring-0 resize-none placeholder-gray-500" 
                        rows="3" 
                        placeholder="Create a new announcement..."
                    />
                </div>
                {imageFile && <p className="text-sm text-green-600 mt-2 ml-14">Image selected: {imageFile.name}</p>}
                {error && <p className="text-sm text-red-600 mt-2 ml-14">{error}</p>}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-4 text-gray-500">
                        <label htmlFor="image-upload" className="cursor-pointer hover:text-[#312E81] transition-colors">
                            <ImageIcon className="w-5 h-5" />
                            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-[#312E81] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#282569] transition-colors flex items-center disabled:opacity-50">
                        <PlusIcon className="w-4 h-4 mr-2" /> {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateAnnouncement;
