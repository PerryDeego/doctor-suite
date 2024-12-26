import React, { createContext } from "react";
import PropTypes from "prop-types";
import { assets } from "../assets/assets_frontend/assets"; // Ensure this path is correct

// Create the context
export const AppContext = createContext({}); // Provide a default value

const AppContextProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{ assets }}>
            {children}
        </AppContext.Provider>
    );
};

// Define PropTypes for AppContextProvider
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;
