import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify"; 
import { assets } from "../assets/assets_admin/assets";

export const AdminContext = createContext(); 

const AdminContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token || '');
  }, []);

  const [doctors, setDoctors] = useState([]);
  const endpoint = '/api/admin'; 
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const getDoctorList = useCallback(async () => {
    try {
      console.log("Access Token:", accessToken); // Debugging line
      const { data } = await axios.get(`${backendURL}${endpoint}/doctor-list`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error retrieving doctor list:", error); // Log the error
      toast.error(error.message);
    }
  }, [accessToken, backendURL, endpoint]);

  useEffect(() => {
    if (accessToken) {
      getDoctorList();
    }
  }, [accessToken, getDoctorList]);

  const changeDoctorAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post(`${backendURL}${endpoint}/change-availability`, { doctorId }, { headers: { Authorization: `Bearer ${accessToken}`}} );
      if (data.success) {
        getDoctorList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error changing doctor availability:", error); // Log the error
      toast.error(error.message);
    }
  }

  const value = {
    accessToken,
    assets,
    backendURL,
    endpoint,
    setAccessToken,
    doctors,
    getDoctorList,
    changeDoctorAvailability
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;