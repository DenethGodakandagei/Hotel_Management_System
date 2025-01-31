import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user details from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Try to fetch user data from the server if it's not in sessionStorage
      const loadUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/protected', { withCredentials: true });
          setUser(response.data.user);
          sessionStorage.setItem('user', JSON.stringify(response.data.user)); // Store in sessionStorage
        } catch (error) {
          console.error('User not authenticated or session expired.');
        }
      };

      loadUser();
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData)); // Store in sessionStorage
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist the update
  };
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout , updateUser  }}>
      {children}
    </AuthContext.Provider>
  );
};
