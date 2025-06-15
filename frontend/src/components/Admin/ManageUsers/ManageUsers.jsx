import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DashboardNavigater from "../DashboardNavigater";
import StaffRegistration from "../../Staff/StaffRegistration";
import api from "../../../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
      //  const response = await axios.get("http://localhost:5000/api/users");
          const response = await api.get("/users");
        setUsers(response.data.data);
        setError("");
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unable to fetch user data. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Delete user function
  const deleteUser = async (id) => {
    try {
      //await axios.delete(`http://localhost:5000/api/users/${id}`);
       await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Unable to delete the user. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardNavigater />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="flex justify-between bg-gradient-to-r from-primary2 to-primary1 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Manage Users</h2>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="text-2xl border border-white rounded-md p-2 font-bold hover:scale-105 transition-transform"
          >
            Add Member
          </button>
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
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none ml-2"
                        >
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

      {/* Full-Screen Modal for Add Member */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)} // Close modal on overlay click
        >
          <div
            className="bg-white w-full max-w-4xl h-full overflow-y-auto rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold">Add Member</h2>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="text-gray-500 hover:text-gray-800"
              >
                &#x2715;
              </button>
            </div>
            <div className="p-6">
              <StaffRegistration />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
