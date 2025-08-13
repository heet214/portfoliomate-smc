import React from 'react';
import { employeeData } from '../data/data';

function ViewEmployeesPage() {
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
                            {employeeData.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4"><img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full" /></td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{emp.name}</td>
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
                    {employeeData.map((emp) => (
                        <div key={emp.id} className="p-4">
                            <div className="flex items-center gap-4">
                                <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full" />
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-900">{emp.name}</p>
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
