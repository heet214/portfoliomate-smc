import React from 'react';
import { Link } from 'react-router-dom';

const InputField = ({ id, label, type, placeholder, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm focus:ring-[#312E81] focus:border-[#312E81]" />
    </div>
);

function AddEmployeePage() {
    return (
        <form className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Employee Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField id="name" label="Name" type="text" />
                    <InputField id="email" label="E-mail" type="email" />
                    <InputField id="password" label="Password" type="password" />
                    <InputField id="confirm-password" label="Confirm Password" type="password" />
                    <InputField id="role" label="Role" type="text" />
                    <InputField id="parent-company" label="Parent Company" type="text" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Profile Photo</h2>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" /></label><p className="pl-1">or drag and drop</p></div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Link to="/settings" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</Link>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#312E81] rounded-md hover:bg-indigo-800">Add Employee</button>
            </div>
        </form>
    );
}

export default AddEmployeePage;
