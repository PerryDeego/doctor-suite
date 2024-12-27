import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify"; 

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');

  const endpoint = '/api/admin';
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const value = {
    accessToken,
    assets,
    backendURL,
    endpoint,
    setAccessToken
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoctorContextProvider;