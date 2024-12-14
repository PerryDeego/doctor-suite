import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create AdminContext without passing props
export const AdminContext = createContext(); 

const AdminContextProvider = ({ children }) => {
  // Initialize accessToken from local storage or default to an empty string
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || ''); 
  
  // Access backend URL from environment variables
  const backendURL = import.meta.env.VITE_BACKEND_URL; 

  // Optional: Validate backendURL
  if (!backendURL) {
    console.error("Backend URL is not defined in the environment variables.");
  }

  // Define value object for the provider
  const value = {
    accessToken,
    setAccessToken,
    backendURL,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Define PropTypes for AdminContextProvider
AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;

