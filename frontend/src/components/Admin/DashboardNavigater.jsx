import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext.js";


const DashboardNavigater = () => {
    const { logout } = useAuth();

    
const handleLogout = () => {
  logout(); 
  window.location.href = '/';
};

     
  return (
    <div>
       {/* Sidebar */}
       <aside className="w-full h-full bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-10">
          Admin Dashboard
        </h1>
        <ul className="space-y-6">
          {[
            { name: "Dashboard Overview", path: "/" },
            { name: "Manage Users", path: "/manageusers" },
            { name: "Rooms", path: "/managerooms" },
            { name: "Reservations", path: "/reservations" },
            { name: "Manage Menu", path: "/managemenu" },
            { name: "Settings", path: "/settings" },
           
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path} // Use Link for navigation
                className="p-3 text-gray-700 hover:text-white hover:bg-orange-500 rounded-md cursor-pointer transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
           <li>
              <button
                onClick={handleLogout}
                className="pl-2 text-gray-700 hover:text-white hover:bg-orange-500 rounded-md cursor-pointer transition duration-300"
              >
               Logout
              </button>
            </li>
        </ul>
      </aside>

    </div>
  )
}

export default DashboardNavigater
