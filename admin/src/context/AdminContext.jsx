import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you import toast
import { assets } from "../assets/assets_admin/assets";

// Create AdminContext without passing props
export const AdminContext = createContext(); 

const AdminContextProvider = ({ children }) => {
  // Initialize accessToken from local storage or default to an empty string
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [doctors, setDoctors] = useState([]); // Initialize doctors state

  const endpoint = '/api/admin'; 
  const backendURL = import.meta.env.VITE_BACKEND_URL;  // Access backend URL from environment variables

  const getDoctorList = async () => {
    try {
      const { data } = await axios.post( backendURL + endpoint + '/doctor-list', {}, { headers: accessToken } );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const changeDoctorAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post( backendURL + endpoint + '/change-availability', { doctorId }, { headers: {accessToken} } );

      if (data.success) {
        getDoctorList(); // Refresh the doctor list after changing availability
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  // Define value object for the provider
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

// Define PropTypes for AdminContextProvider
AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;