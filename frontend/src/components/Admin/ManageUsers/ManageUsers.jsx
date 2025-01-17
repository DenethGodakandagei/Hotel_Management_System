import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNavigater from '../DashboardNavigater';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data.data); 
        setError('');
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Unable to fetch user data. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardNavigater />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Manage Users</h2>
        </div>

        {/* Dashboard Content */}
        <div className="mt-10">
          {/* Users Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-400">{error}</p>}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Role</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Phone</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
