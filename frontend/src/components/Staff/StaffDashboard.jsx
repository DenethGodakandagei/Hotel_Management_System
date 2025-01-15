import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';
import ManageReservation from '../Admin/ReservationManage/ManageReservation.jsx';
import ViewRooms from '../Admin/RoomManage/ViewRooms.jsx';
import ManageMenu from '../Admin/MenuManage/ManageMenu.jsx';
import AllReservations from '../Admin/ReservationManage/AllReservations.jsx';

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
             <AllReservations />
             Generete reports
            </ul>
          </div>
        );
      case 'receptionist':
        return (
          <div>
            <h2>Receptionist Dashboard</h2>
            <AllReservations />
           <ViewRooms />
          </div>
        );
      case 'housekeeping':
        return (
          <div>
            <h2>Housekeeping Dashboard</h2>
           
          </div>
        );
      case 'chef':
        return (
          <div>
            <h2>Chef Dashboard</h2>
           <ManageMenu />
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
