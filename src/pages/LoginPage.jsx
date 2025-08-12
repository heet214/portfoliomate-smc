import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Login</h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          This page does not have the sidebar and is also fully responsive.
        </p>
        <div className="flex flex-col space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Sign In
        </button>
        <div className="text-center">
            <Link to="/" className="text-sm text-blue-500 hover:underline">
                ← Go back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;