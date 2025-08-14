import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { uploadFileToStorage } from '../utils/storage';
import { addEmployee } from '../apis';

const InputField = ({ id, label, type, value, onChange, required = true, disabled = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
        <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} disabled={disabled} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-[#312E81] focus:border-[#312E81] disabled:bg-gray-100 disabled:cursor-not-allowed" />
    </div>
);

function AddEmployeePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'employee', // Default role
        parentCompany: user?.parentCompanyName || user?.displayName || 'N/A',
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPhotoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        setLoading(true);

        try {
            let photoURL = null;
            if (photoFile) {
                photoURL = await uploadFileToStorage(photoFile, 'profileImages');
            }

            const employeeData = { ...formData, photoURL };
            delete employeeData.confirmPassword; // Don't send this to backend

            const newEmployee = await addEmployee(employeeData);
            console.log("Employee created successfully:", newEmployee);
            navigate('/settings/view-employees');

        } catch (err) {
            setError(err.message || "Failed to add employee.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center">
                 <Link to="/settings" className="mr-4 p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add Employee</h1>
            </div> */}
            <div className="flex-grow overflow-y-auto">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Employee Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField id="name" label="Name" type="text" value={formData.name} onChange={handleChange} />
                            <InputField id="email" label="E-mail" type="email" value={formData.email} onChange={handleChange} />
                            <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
                            <InputField id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} />
                            <InputField id="role" label="Role" type="text" value={formData.role} onChange={handleChange} />
                            <InputField id="parentCompany" label="Parent Company" type="text" value={formData.parentCompany} onChange={handleChange} disabled />
                        </div>
                    </div>

                     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Profile Photo</h2>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} /></label><p className="pl-1">or drag and drop</p></div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                {photoFile && <p className="text-sm text-green-600 mt-2">{photoFile.name}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4">
                        <Link to="/settings" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
                        <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-[#312E81] rounded-md hover:bg-indigo-800 disabled:opacity-50">
                            {loading ? 'Adding...' : 'Add Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeePage;
