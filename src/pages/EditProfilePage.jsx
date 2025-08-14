import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Assuming mock data is in a path like this for demonstration
const profileData = {
  name: 'Innovate Inc.',
  brandName: 'Innovate',
  website: 'https://innovate.com',
  incorporatedAt: 'USA',
  cin: 'U72900KA2021PTC143578',
  address: '123 Tech Park, Silicon Valley',
  pincode: '94043',
  about: 'Innovate Inc. is a leading provider of cutting-edge technology solutions, specializing in AI and machine learning applications. Our mission is to empower businesses with transformative technology.',
  logo: 'https://placehold.co/200x200/312E81/FFFFFF?text=I',
  sectors: ['Sector Agnostic', '3D Technology'],
};


// --- Reusable Components (No changes needed) ---
const InputField = ({ id, label, type = 'text', value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} id={id} name={id} value={value} onChange={onChange} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-[#312E81] focus:border-[#312E81]" />
    </div>
);

const TextareaField = ({ id, label, value, onChange, rows = 4 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea id={id} name={id} value={value} onChange={onChange} rows={rows} className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-[#312E81] focus:border-[#312E81] resize-y"></textarea>
    </div>
);

const ImageUploadField = ({ label, currentImage, preview, onFileChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex items-center gap-6 mt-2">
            <img 
              src={currentImage} 
              alt="Current logo" 
              className="w-24 h-24 rounded-lg object-cover bg-gray-100"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/EAEAEA/BDBDBD?text=Error'; }}
            />
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-center text-xs text-gray-500">
                {preview ? <img src={preview} alt="New logo preview" className="w-full h-full rounded-lg object-cover" /> : 'New Logo Preview'}
            </div>
            <label htmlFor="logo-upload" className="cursor-pointer text-sm font-medium text-[#312E81] hover:text-indigo-800">
                Choose File
                <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={onFileChange} accept="image/*" />
            </label>
        </div>
    </div>
);

// --- Restyled EditProfilePage ---
function EditProfilePage() {
    const { type, id } = useParams(); 
    const [formData, setFormData] = useState(profileData);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        alert("Changes saved!"); // Replace with a proper notification/toast
    };

    return (
        // Root container, exactly like AddEmployeePage
        <div className="h-full flex flex-col bg-gray-50">
            {/* Single scrollable area for the entire form content */}
            <div className="flex-grow overflow-y-auto">
                {/* The main form container.
                  - We add padding here because the AppLayout removes it for this route.
                  - `space-y-8` provides vertical spacing between form sections.
                */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Page Header (now inside the form flow) */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Editing Company Profile</h1>
                            <p className="text-sm text-gray-500 mt-1">Edit details and click on save changes to apply.</p>
                        </div>

                        {/* Company Information Section */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Company Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField id="name" label="Company Name *" value={formData.name} onChange={handleChange} />
                                <InputField id="brandName" label="Brand Name *" value={formData.brandName} onChange={handleChange} />
                                <InputField id="website" label="Website" value={formData.website} onChange={handleChange} />
                                <InputField id="incorporatedAt" label="Choose Country *" value={formData.incorporatedAt} onChange={handleChange} />
                                <InputField id="cin" label="CIN *" value={formData.cin || ''} onChange={handleChange} />
                                <InputField id="address" label="Address *" value={formData.address || ''} onChange={handleChange} />
                                <InputField id="pincode" label="Pincode *" value={formData.pincode || ''} onChange={handleChange} />
                            </div>
                        </div>

                        {/* About & Logo Section */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Details & Branding</h2>
                            <div className="space-y-6">
                                <TextareaField id="about" label="About *" value={formData.about} onChange={handleChange} />
                                <ImageUploadField label="Change Company Logo" currentImage={formData.logo} preview={imagePreview} onFileChange={handleFileChange} />
                            </div>
                        </div>
                        
                        {/* Sectors Section */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Select Sectors</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {formData.sectors.map(sector => (
                                    <div key={sector} className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                                        {sector}
                                        <button type="button" className="ml-2 text-indigo-500 hover:text-indigo-700">&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action buttons at the bottom, styled exactly like AddEmployeePage */}
                        <div className="flex justify-end gap-4 pt-4">
                            <Link to={`/stakeholders/${type}/${id}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#312E81] rounded-md hover:bg-indigo-800">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;
