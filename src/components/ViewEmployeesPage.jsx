import React, { useState, useEffect } from 'react';
import { getEmployees } from '../apis'; // Import the new API function

function ViewEmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeeData = await getEmployees();
                setEmployees(employeeData);
            } catch (err) {
                setError(err.message || 'Failed to fetch employees.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div className="text-center p-8">Loading employees...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">Error: {error}</div>;
    }

    if (employees.length === 0) {
        return <div className="text-center p-8 text-gray-500">No employees found.</div>;
    }

    return (
        <div className="">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Profile</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employees.map((emp) => (
                                <tr key={emp.userId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img 
                                            src={emp.photoURL || `https://ui-avatars.com/api/?name=${emp.displayName}&background=E2E8F0&color=4A5568`} 
                                            alt={emp.displayName} 
                                            className="w-10 h-10 rounded-full" 
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{emp.displayName}</td>
                                    <td className="px-6 py-4">{emp.email}</td>
                                    <td className="px-6 py-4">{emp.role}</td>
                                    <td className="px-6 py-4 space-x-3 text-right">
                                        <button className="font-medium text-indigo-600 hover:underline">Edit</button>
                                        <button className="font-medium text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                    {employees.map((emp) => (
                        <div key={emp.userId} className="p-4">
                            <div className="flex items-center gap-4">
                                <img 
                                    src={emp.photoURL || `https://ui-avatars.com/api/?name=${emp.displayName}&background=E2E8F0&color=4A5568`} 
                                    alt={emp.displayName} 
                                    className="w-12 h-12 rounded-full" 
                                />
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-900">{emp.displayName}</p>
                                    <p className="text-sm text-gray-600">{emp.role}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 my-3">{emp.email}</p>
                            <div className="flex justify-end gap-4">
                                <button className="font-medium text-indigo-600 hover:underline">Edit</button>
                                <button className="font-medium text-red-600 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewEmployeesPage;
