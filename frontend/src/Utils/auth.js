export const getToken = () => {
    return localStorage.getItem("token"); // Retrieve JWT token from localStorage
  };
  
  export const getUser = () => {
    return JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  