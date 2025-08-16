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

const ImageUploadField = ({ label, currentImage, preview, onFileChange, onRemove }) => {
    const displayImage = preview || currentImage;

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <span className="block text-sm font-medium text-gray-700 mb-3">{label}</span>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Image Preview */}
                <div className="relative w-32 h-32 flex-shrink-0">
                    {displayImage ? (
                        <>
                            <img
                                src={displayImage}
                                alt="Company Logo"
                                className="w-full h-full object-cover rounded-xl border border-gray-300"
                            />
                            {/* Hover overlay with actions */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 rounded-xl opacity-0 hover:opacity-100 transition">
                                <label
                                    htmlFor="logoUpload"
                                    className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-md shadow cursor-pointer hover:bg-indigo-700"
                                >
                                    Change
                                </label>
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </>
                    ) : (
                        // Empty state (no logo)
                        <label
                            htmlFor="logoUpload"
                            className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 cursor-pointer hover:border-indigo-500 hover:text-indigo-600 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mb-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-xs font-medium">Upload Logo</span>
                        </label>
                    )}

                    <input
                        type="file"
                        id="logoUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                    />
                </div>

                {/* Info text */}
                <div className="flex flex-col text-center sm:text-left gap-2">
                    <p className="text-sm text-gray-600">
                        {displayImage
                            ? "Upload a new logo or remove the current one."
                            : "Upload JPG, PNG, or SVG (max 2MB)."}
                    </p>
                    {!displayImage && (
                        <label
                            htmlFor="logoUpload"
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#312E81] rounded-md shadow hover:bg-indigo-800 cursor-pointer"
                        >
                            Select File
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Restyled EditProfilePage ---
function EditProfilePage() {
    const { type, id } = useParams();
    const [formData, setFormData] = useState(profileData);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, logo: '' }));
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
        <div className="h-full flex flex-col">
            <div className="flex-grow overflow-y-auto">
                <form className="space-y-8" onSubmit={handleSubmit}>
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

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Details & Branding</h2>
                        <div className="space-y-6">

                            <TextareaField id="about" label="About *" value={formData.about} onChange={handleChange} />

                            <ImageUploadField
                                label="Company Logo"
                                currentImage={formData.logo}
                                preview={imagePreview}
                                onFileChange={handleFileChange}
                                onRemove={handleRemoveImage}
                            />

                        </div>
                    </div>

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

                    <div className="flex justify-end gap-4 pt-4">

                        <Link to={`/stakeholders/${type}/${id}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>

                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#312E81] rounded-md hover:bg-indigo-800">Save Changes</button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePage;
