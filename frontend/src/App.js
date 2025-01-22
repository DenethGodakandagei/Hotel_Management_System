import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './Utils/ProtectedRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminDashboard from './components/Admin/AdminDashboard';
import ManageRooms from './components/Admin/RoomManage/ManageRooms';
import Roominfo from './components/Roominfo';
import { AuthProvider } from './context/AuthContext';
import ManageReservation from './components/Admin/ReservationManage/ManageReservation';
import ManageMenu from './components/Admin/MenuManage/ManageMenu';
import Dining from './components/Dining';
import ManageUsers from './components/Admin/ManageUsers/ManageUsers';
import AdminSettings from './components/Admin/AdminSettings/AdminSettings';
import StaffDashboard from './components/Staff/StaffDashboard';
import ExtendRooms from './components/ExtendRooms';
import NavBar from './components/Navbar';
import { ExtendDining } from './components/ExtendDining';



function App() {
  return (
    <div className="App font-barlow">
       <Toaster position="top-center" containerStyle={{ top: 60 }} />
         <AuthProvider>
      <BrowserRouter>
      
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/:id" element={<Roominfo />} />
          <Route path="/dining" element={<ExtendDining />} />
          <Route path="/rooms" element={<ExtendRooms />} />
          
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
            <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/staff/dashboard"
            element={<ProtectedRoute element={<StaffDashboard />} />}
          />
             <Route path="/managerooms" element={<ManageRooms />} />
             <Route path="/reservations" element={<ManageReservation />} />
             <Route path="/managemenu" element={<ManageMenu />} />
             <Route path="/manageusers" element={<ManageUsers />} />
             <Route path="/settings" element={<AdminSettings />} />
             
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
