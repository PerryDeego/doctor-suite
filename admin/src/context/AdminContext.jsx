import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { assets } from "../assets/assets_admin/assets";

// Create AdminContext without passing props
export const AdminContext = createContext(); 

const AdminContextProvider = ({ children }) => {
  // Initialize accessToken from local storage or default to an empty string
  const [ accessToken, setAccessToken ] = useState( localStorage.getItem('accessToken') || '' ); 
  
  // Access backend URL from environment variables
  const endpoint = '/api/admin'; // Always use admin login endpoint
  const backendURL = import.meta.env.VITE_BACKEND_URL; 

  // Define value object for the provider
  const value = {
    accessToken,
    assets,
    backendURL,
    endpoint,
    setAccessToken,
  };

  return (
    <AdminContext.Provider value={ value }>
      {children}
    </AdminContext.Provider>
  );
};

// Define PropTypes for AdminContextProvider
AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;

