import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './Utils/ProtectedRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './components/Admin/AdminDashboard';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
            <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
