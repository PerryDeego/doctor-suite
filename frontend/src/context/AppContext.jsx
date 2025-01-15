import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from 'axios'; // Import axios
import { assets, specialityData } from "../assets/assets_frontend/assets";

// Create the context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [ accessToken, setAccessToken ] = useState(''); // Corrected variable name
    const [ doctors, setDoctors ] = useState([]); // State to hold the list of doctors
    const [ userInfo, setUserInfo ] = useState( false );

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setAccessToken(token || false);
    }, []);

    const endpoint = '/api/doctor'; 
    const userEndpoint = '/api/user';
    const currencySymbol = '$';
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Array of specialties available for filtering
    const specialties = [
        "Dermatologist",
        "Gastroenterologist",
        "General physician",
        "Gynecologist",
        "Pediatricians",
        "Neurologist"
    ];

    // Function to fetch doctors data from the backend
    const fetchDoctorsData = async () => {
        try {
            const response = await axios.get(`${backendURL}${endpoint}/doctors-list`);
            const { data } = response;
    
            if (data.success) {
                setDoctors(data.doctors);
                // console.log("Doctors fetched:", data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error retrieving doctor list:", error);
            toast.error(error.message);
        }
    };

    //------ Function to fetch User Profile
    const fetchUserProfile = async () => {
        try {
            const  { data } = await axios.get(`${backendURL}${userEndpoint}/get-profile`, { headers: {accessToken}});
    
            if (data.success) {
                setUserInfo(data.userData);
                console.log("User profile found:", data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error while loading your profile!", error);
            toast.error(error.message);
        }

    };

     // Fetch doctors data when the component mounts
     useEffect(() => {
        fetchDoctorsData(); // Call the function when the component mounts
    }, []); // Empty dependency array means it runs once on mount

     // Fetch user profile data when the component mounts
     useEffect(() => {
        if( !accessToken) {
            setUserInfo(false);
        }  

        fetchUserProfile(); // Call the function when the component mounts
    }, [accessToken]); // Empty dependency array means it runs once on mount


    return (
        <AppContext.Provider value={{ accessToken, assets, backendURL, currencySymbol, daysOfWeek, doctors, endpoint, fetchUserProfile, specialties, specialityData, setAccessToken,setUserInfo, userEndpoint, userInfo }}>
            {children}
        </AppContext.Provider>
    );
};

// Define PropTypes for AppContextProvider
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;