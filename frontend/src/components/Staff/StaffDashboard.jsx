import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';

const StaffDashboard = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [staffRole, setStaffRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch staff role based on user ID
    const fetchStaffRole = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/staff/${user.id}`);
        setStaffRole(response.data.role);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch staff role.');
        setStaffRole('');
      } finally {
        setLoading(false);
      }
    };

    fetchStaffRole();
  }, [user.id]);

  // Render role-specific content
  const renderRoleSpecificContent = () => {
    switch (staffRole) {
      case 'manager':
        return (
          <div>
            <h2>Manager Dashboard</h2>
            <ul>
              <li>View and Manage Reservations</li>
              <li>Manage Staff</li>
              <li>Generate Reports</li>
            </ul>
          </div>
        );
      case 'receptionist':
        return (
          <div>
            <h2>Receptionist Dashboard</h2>
            <ul>
              <li>Handle Guest Check-Ins/Check-Outs</li>
              <li>Manage Reservations</li>
              <li>View Room Status</li>
            </ul>
          </div>
        );
      case 'housekeeping':
        return (
          <div>
            <h2>Housekeeping Dashboard</h2>
            <ul>
              <li>Update Room Status</li>
              <li>Report Maintenance Issues</li>
            </ul>
          </div>
        );
      case 'chef':
        return (
          <div>
            <h2>Chef Dashboard</h2>
            <ul>
              <li>Manage Menu</li>
              <li>Track Orders</li>
              <li>Monitor Kitchen Inventory</li>
            </ul>
          </div>
        );
      default:
        return <div>No role-specific content available.</div>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Staff Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        renderRoleSpecificContent()
      )}
    </div>
  );
};

export default StaffDashboard;
