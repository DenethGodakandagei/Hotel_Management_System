import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './Utils/ProtectedRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageRooms from './components/Admin/RoomManage/ManageRooms';
import Roominfo from './components/Roominfo';
import { AuthProvider } from './context/AuthContext';
import ManageReservation from './components/Admin/ReservationManage/ManageReservation';
import ManageMenu from './components/Admin/MenuManage/ManageMenu';


function App() {
  return (
    <div className="App">
         <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/:id" element={<Roominfo />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
            <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
             <Route path="/managerooms" element={<ManageRooms />} />
             <Route path="/reservations" element={<ManageReservation />} />
             <Route path="/managemenu" element={<ManageMenu />} />
             
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
