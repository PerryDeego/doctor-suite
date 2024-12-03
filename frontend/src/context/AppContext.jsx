import React, { createContext } from "react";
import PropTypes from "prop-types";
import { doctors } from "../assets/assets_frontend/assets";

// Create the context
export const AppContext = createContext();

const currencySymbol = '$';
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

const AppContextProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{ daysOfWeek, doctors, currencySymbol, specialties }}>
            {children}
        </AppContext.Provider>
    );
};

// Define PropTypes for AppContextProvider
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;