import React from 'react'
import DashboardNavigater from '../DashboardNavigater'

const ManageUsers = () => {
  return (
    <div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <DashboardNavigater />

    {/* Main Content */}
    <main className="flex-1 p-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <p className="mt-2 text-sm">Here's a summary of your dashboard.</p>
      </div>

      {/* Dashboard Content */}
      <div className="mt-10">
        {/* Dashboard Widgets */}
        
          <div className="bg-white p-6 rounded-lg shadow-md">
         
   
          </div>
          
        </div>

      
      
    </main>

   
  </div>
  )
}

export default ManageUsers